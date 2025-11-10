/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/* eslint-disable max-lines-per-function, max-statements */

import type Machine from '../Machine';

import Bus from '../Bus';
import RAM from '../RAM';
import NameTable from './NameTable';
import PatternTable from './PatternTable';
import PPUAddressIncrement from './PPUAddressIncrement';
import PPUMode from './PPUMode';
import SpriteSize from './SpriteSize';

/**
 * The PPU's OAM size.
 * @see {@link https://www.nesdev.org/wiki/PPU_OAM} for details about OAM.
 */
export const OAM_SIZE = 256;

export const NAME_TABLE_START = 0x2000;

export const FRAME_WIDTH = 256;

export const FRAME_HEIGHT = 240;

export const TILE_SIZE = 8;

export const TILE_IN_ROW = FRAME_WIDTH / TILE_SIZE;

export const TILE_IN_COLUMN = FRAME_HEIGHT / TILE_SIZE;

export const NAME_TABLE_SIZE = TILE_IN_ROW * TILE_IN_COLUMN;

export const ATTRIBUTE_TABLE_SIZE = 64;

export const NAME_TABLE_OFFSET = NAME_TABLE_SIZE + ATTRIBUTE_TABLE_SIZE;

export const FIRST_PATTERN_TABLE_START = 0x0000;

export const SECOND_PATTERN_TABLE_START = 0x1000;

export const PATTERN_SIZE = 16;

export const TILE_IN_ATTRIBUTE_GROUP_SIDE = 4;

export const ATTRIBUTE_SIZE = 1;

export const QUADRANTS_IN_ATTRIBUTE_GROUP_SIDE = 2;

export const BIT_IN_COLOR = 2;

/**
 * Frame event name.
 *
 * @public
 */
export const FRAME = 'frame';

/**
 * Frame event defail.
 *
 * @public
 */
export interface FrameEventDetail {
	/**
	 * Frame buffer.
	 */
	frameBuffer: Uint8ClampedArray;
}

/**
 * Implementation of the PPU.
 * @see {@link https://www.nesdev.org/wiki/PPU} for details about the PPU.
 *
 * @public
 */
class PPU extends EventTarget {
	backgroundFrameBuffer = new Uint8ClampedArray(FRAME_WIDTH * FRAME_HEIGHT * 4);

	/**
	 * Background pattern table.
	 */
	backgroundPatternTable = PatternTable.First;

	/**
	 * Base nametable.
	 */
	baseNameTable = NameTable.TopLeft;

	/**
	 * Internal read buffer used by PPUDATA.
	 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
	 */
	buffer = 0;

	/**
	 * PPU bus; provides access to VRAM and the cartridge character ROM.
	 */
	readonly bus = new Bus();

	cycle = 0;

	/**
	 * Enables blue color emphasis.
	 */
	emphasizeBlue = false;

	/**
	 * Enables green color emphasis.
	 */
	emphasizeGreen = false;

	/**
	 * Enables red color emphasis.
	 */
	emphasizeRed = false;

	/**
	 * Enables background rendering.
	 */
	enableBackgroundRendering = false;

	/**
	 * Enables sprite rendering.
	 */
	enableSpriteRendering = false;

	frame = 0;

	frameBuffer = new Uint8ClampedArray(FRAME_WIDTH * FRAME_HEIGHT * 4);

	/**
	 * Enables grayscale mode.
	 */
	grayscale = false;

	/**
	 * Internal latch used by PPUADDR and PPUSCROLL.
	 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
	 *
	 * @remarks Resets when reading PPUSTATUS.
	 */
	latch = false;

	/**
	 * The machine
	 */
	readonly machine: Machine;

	/**
	 * PPU mode.
	 */
	mode = PPUMode.Slave;

	/**
	 * Controls CPU NMI on vblank.
	 */
	nmiEnabled = false;

	/**
	 * OAM, implemented as RAM.
	 */
	readonly oam = new RAM(OAM_SIZE);

	/**
	 * OAM address.
	 */
	oamAddress = 0x00;

	/**
	 * PPU bus address.
	 */
	ppuAddress = 0;

	/**
	 * PPU address increment.
	 */
	ppuAddressIncrement = PPUAddressIncrement.Accross;

	scanline = 0;

	/** Horizontal scroll. */
	scrollX = 0;

	/** Vertical scroll. */
	scrollY = 0;

	/**
	 * Shows background in the leftmost 8 pixels of the screen.
	 */
	showBackgroundInLeftmost8PixelsOfScreen = false;

	/**
	 * Shows sprites in the leftmost 8 pixels of the screen.
	 */
	showSpritesInLeftmost8PixelsOfScreen = false;

	/**
	 * Indicates sprite overflow.
	 */
	spriteOverflow = false;

	/**
	 * Sprite pattern table.
	 */
	spritePatternTable = PatternTable.First;

	/**
	 * Sprite size.
	 */
	spriteSize = SpriteSize.Default;

	/**
	 * Indicates a sprite zero hit.
	 */
	spriteZeroHit = false;
	/**
	 * Indicates vertical blank (vblank).
	 */
	vblank = false;

	constructor(machine: Machine) {
		super();

		this.machine = machine;
	}

	/**
	 * Renders the next pixel.
	 */
	public step(): void {
		// Handle end-of-scanline wrap first so we can react at dot 0
		if (this.cycle > 340) {
			this.cycle = 0;
			this.scanline++;
		}

		// End of frame: swap buffers and emit frame event
		if (this.scanline > 261) {
			this.scanline = 0;
			this.frame++;
			const temp = this.frameBuffer;
			this.frameBuffer = this.backgroundFrameBuffer;
			this.backgroundFrameBuffer = temp;

			this.dispatchEvent(
				new CustomEvent<FrameEventDetail>(FRAME, { detail: { frameBuffer: this.frameBuffer } }),
			);
		}

		// Start of vblank on scanline 241, dot 0
		if (this.scanline === 241 && this.cycle === 0) {
			this.vblank = true;
			if (this.nmiEnabled) this.machine.cpu.nmi();
		}

		// Clear vblank during pre-render line
		if (this.scanline === 261) {
			this.vblank = false;
		}

		// Visible area
		// Visible dots are 1..256 (x = dot-1)
		if (this.scanline < 240 && this.cycle >= 1 && this.cycle <= 256) this.#draw();

		this.cycle++;
	}

	#draw(): void {
		let backgroundColor = 0;
		const x = this.cycle - 1;

		if (this.enableBackgroundRendering) backgroundColor = this.#getBackgroundColor();

		const pixelIndex = this.scanline * FRAME_WIDTH + x;

		const shade = Math.round((backgroundColor / 15) * 255);
		this.backgroundFrameBuffer[pixelIndex * 4] = shade; // R
		this.backgroundFrameBuffer[pixelIndex * 4 + 1] = shade; // G
		this.backgroundFrameBuffer[pixelIndex * 4 + 2] = shade; // B
		this.backgroundFrameBuffer[pixelIndex * 4 + 3] = 255; // A
	}

	#getBackgroundColor(): number {
		const scrolledX = this.cycle - 1 + this.scrollX;
		const scrolledY = this.scanline + this.scrollY;
		const tileColumn = Math.floor(scrolledX / TILE_SIZE) % TILE_IN_ROW;
		const tileRow = Math.floor(scrolledY / TILE_SIZE) % TILE_IN_COLUMN;
		const nameTableXCarry = scrolledX >= FRAME_WIDTH ? 1 : 0;
		const nameTableYCarry = scrolledY >= FRAME_HEIGHT ? 1 : 0;
		const effectiveNameTable =
			(this.baseNameTable + nameTableXCarry + (nameTableYCarry << 1)) & 0x03;
		const nameTableStart = NAME_TABLE_START + NAME_TABLE_OFFSET * effectiveNameTable;
		const nameTableAddress = nameTableStart + TILE_IN_ROW * tileRow + tileColumn;

		const patternIndex = this.bus.read(nameTableAddress);
		const patternTableStart =
			this.backgroundPatternTable === PatternTable.First
				? FIRST_PATTERN_TABLE_START
				: SECOND_PATTERN_TABLE_START;

		const patternStart = patternTableStart + PATTERN_SIZE * patternIndex;
		const patternPixelRow = scrolledY % TILE_SIZE;

		const patternLowByteAddress = patternStart + patternPixelRow;
		const patterLowByte = this.bus.read(patternLowByteAddress);
		const patternHighByte = this.bus.read(patternLowByteAddress + 8);

		const fineX = scrolledX % TILE_SIZE;
		const patternBit = 7 - fineX;
		let backgroundColor =
			((patterLowByte >> patternBit) & 0x01) | (((patternHighByte >> patternBit) & 0x01) << 1);

		// Attribute selection
		const attributeRow = Math.floor(tileRow / TILE_IN_ATTRIBUTE_GROUP_SIDE);
		const attributeColumn = Math.floor(tileColumn / TILE_IN_ATTRIBUTE_GROUP_SIDE);
		const attributeIndex =
			attributeRow * (TILE_IN_ROW / TILE_IN_ATTRIBUTE_GROUP_SIDE) + attributeColumn;
		const attributeTableStart = nameTableStart + NAME_TABLE_SIZE;
		const attributeAddress = attributeTableStart + attributeIndex * ATTRIBUTE_SIZE;
		const attribute = this.bus.read(attributeAddress);
		const tileRowInAttributeGroup = tileRow % TILE_IN_ATTRIBUTE_GROUP_SIDE;
		const tileColumnInAttributeGroup = tileColumn % TILE_IN_ATTRIBUTE_GROUP_SIDE;
		const attributeGroupQuadrant =
			Math.floor(tileRowInAttributeGroup / QUADRANTS_IN_ATTRIBUTE_GROUP_SIDE) *
				QUADRANTS_IN_ATTRIBUTE_GROUP_SIDE +
			Math.floor(tileColumnInAttributeGroup / QUADRANTS_IN_ATTRIBUTE_GROUP_SIDE);

		const palette = (attribute >> (attributeGroupQuadrant * BIT_IN_COLOR)) & 0x03;

		if (backgroundColor) backgroundColor |= palette << 2;

		return backgroundColor;
	}
}

export default PPU;
