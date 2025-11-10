/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';

/**
 * Mask for bit 7 of PPUMASK, which enables blue color emphasis.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const EMPHASIZE_BLUE_MASK = 0b1000_0000;

/**
 * Mask for bit 6 of PPUMASK, which enables green color emphasis.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const EMPHASIZE_GREEN_MASK = 0b0100_0000;

/**
 * Mask for bit 5 of PPUMASK, which enables red color emphasis.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const EMPHASIZE_RED_MASK = 0b0010_0000;

/**
 * Mask for bit 4 of PPUMASK, which enables sprite rendering.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const ENABLE_SPRITE_RENDERING_MASK = 0b0001_0000;

/**
 * Mask for bit 3 of PPUMASK, which enables background rendering.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const ENABLE_BACKGROUND_RENDERING_MASK = 0b0000_1000;

/**
 * Mask for bit 2 of PPUMASK, which shows sprites in the leftmost 8 pixels of the screen.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const SHOW_SPRITES_IN_LEFTMOST_8_PIXELS_OF_SCREEN_MASK = 0b0000_0100;

/**
 * Mask for bit 1 of PPUMASK, which shows background in the leftmost 8 pixels of the screen.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const SHOW_BACKGROUND_IN_LEFTMOST_8_PIXELS_OF_SCREEN_MASK = 0b0000_0010;

/**
 * Mask for bit 0 of PPUMASK, which enables grayscale mode.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUMASK.
 */
export const GRAYSCALE_MASK = 0b0000_0001;

/**
 * Implementation of the write-only PPUMASK register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Sets PPU rendering and emphasis flags.
 */
class PPUMASK extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		this.ppu.emphasizeBlue = !!(data & EMPHASIZE_BLUE_MASK);
		this.ppu.emphasizeGreen = !!(data & EMPHASIZE_GREEN_MASK);
		this.ppu.emphasizeRed = !!(data & EMPHASIZE_RED_MASK);

		this.ppu.enableSpriteRendering = !!(data & ENABLE_SPRITE_RENDERING_MASK);
		this.ppu.enableBackgroundRendering = !!(data & ENABLE_BACKGROUND_RENDERING_MASK);
		this.ppu.showSpritesInLeftmost8PixelsOfScreen = !!(
			data & SHOW_SPRITES_IN_LEFTMOST_8_PIXELS_OF_SCREEN_MASK
		);
		this.ppu.showBackgroundInLeftmost8PixelsOfScreen = !!(
			data & SHOW_BACKGROUND_IN_LEFTMOST_8_PIXELS_OF_SCREEN_MASK
		);
		this.ppu.grayscale = !!(data & GRAYSCALE_MASK);
	}
}

export default PPUMASK;
