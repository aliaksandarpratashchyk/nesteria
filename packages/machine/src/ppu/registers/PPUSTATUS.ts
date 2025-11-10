/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { ReadOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';

/**
 * Mask for bit 7 of PPUSTATUS, which indicates vblank.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUSTATUS.
 */
export const VBLANK_MASK = 0b1000_0000;

/**
 * Mask for bit 6 of PPUSTATUS, which indicates a sprite zero hit.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUSTATUS.
 */
export const SPRITE_ZERO_HIT_MASK = 0b0100_0000;

/**
 * Mask for bit 5 of PPUSTATUS, which indicates sprite overflow.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPUSTATUS.
 */
export const SPRITE_OVERFLOW = 0b0010_0000;

/**
 * Implementation of the read-only PPUSTATUS register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Reads and returns PPU status flags and resets the latch.
 */
class PPUSTATUS extends PPURegister implements ReadOnlyDevice {
	read(): number {
		const value =
			(this.ppu.vblank ? VBLANK_MASK : 0) |
			(this.ppu.spriteZeroHit ? SPRITE_ZERO_HIT_MASK : 0) |
			(this.ppu.spriteOverflow ? SPRITE_OVERFLOW : 0);

		// Reading PPUSTATUS clears vblank and resets the write latch.
		this.ppu.vblank = false;
		this.ppu.latch = false;

		return value;
	}
}

export default PPUSTATUS;
