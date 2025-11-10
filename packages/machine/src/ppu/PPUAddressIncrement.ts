/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * PPU address increment, either across or down.
 *
 * @remarks Definitions match the corresponding bits in the PPUCTRL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * @public
 */
enum PPUAddressIncrement {
	/** Increment the PPU address by 1. */
	Accross = 0,

	/** Increment the PPU address by 32. */
	Down = 1,
}

export default PPUAddressIncrement;
