/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * PPU master/slave mode.
 *
 * @remarks Definitions match the corresponding bits in the PPUCTRL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * @public
 */
enum PPUMode {
	/** Master mode. */
	Master = 1,

	/** Slave mode. */
	Slave = 0,
}

export default PPUMode;
