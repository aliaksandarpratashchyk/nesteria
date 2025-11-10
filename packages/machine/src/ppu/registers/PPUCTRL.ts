/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';
import type NameTable from '../NameTable';

import PatternTable from '../PatternTable';
import PPUAddressIncrement from '../PPUAddressIncrement';
import PPUMode from '../PPUMode';
import PPURegister from '../PPURegister';
import SpriteSize from '../SpriteSize';

/**
 * Mask for bit 7 of PPUCTRL, which enables NMI on vblank.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const NMI_ENABLED_MASK = 0b1000_0000;

/**
 * Mask for bit 6 of PPUCTRL, which selects PPU master/slave mode.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const MASTER_MODE_MASK = 0b0100_0000;

/**
 * Mask for bit 5 of PPUCTRL, which selects between 8×8 and 8×16 sprites.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const SPRITE_SIZE_MASK = 0b0010_0000;

/**
 * Mask for bit 4 of PPUCTRL, which selects the background pattern table address.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const BACKGROUND_PATTERN_TABLE_ADDRESS_MASK = 0b0001_0000;

/**
 * Mask for bit 3 of PPUCTRL, which selects the sprite pattern table address.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const SPRITE_PATTERN_TABLE_ADDRESS_MASK = 0b0000_1000;

/**
 * Mask for bit 2 of PPUCTRL, which selects the address increment.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const PPU_ADDRESS_INCREMENT_MASK = 0b0000_0100;

/**
 * Mask for bits 0–1 of PPUCTRL, which select the base nametable address.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUCTRL.
 */
export const BASE_NAMETABLE_ADDRESS_MASK = 0b0000_0011;

/**
 * Implementation of the write-only PPUCTRL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Sets PPU control flags.
 */
class PPUCTRL extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		this.ppu.nmiEnabled = !!(data & NMI_ENABLED_MASK);
		this.ppu.mode = data & MASTER_MODE_MASK ? PPUMode.Master : PPUMode.Slave;
		this.ppu.spriteSize = data & SPRITE_SIZE_MASK ? SpriteSize.Long : SpriteSize.Default;
		this.ppu.backgroundPatternTable =
			data & BACKGROUND_PATTERN_TABLE_ADDRESS_MASK ? PatternTable.Second : PatternTable.First;
		this.ppu.spritePatternTable =
			data & SPRITE_PATTERN_TABLE_ADDRESS_MASK ? PatternTable.Second : PatternTable.First;
		this.ppu.ppuAddressIncrement =
			data & PPU_ADDRESS_INCREMENT_MASK ? PPUAddressIncrement.Down : PPUAddressIncrement.Accross;
		this.ppu.baseNameTable = (data & BASE_NAMETABLE_ADDRESS_MASK) as NameTable;
	}
}

export default PPUCTRL;
