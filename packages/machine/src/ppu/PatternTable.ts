/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * The first or second pattern table.
 * @see {@link https://www.nesdev.org/wiki/PPU_pattern_tables} for details about pattern tables.
 *
 * @remarks Definitions match the corresponding bits in the PPUCTRL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * @public
 */
enum PatternTable {
	/** The first pattern table. */
	First = 0,

	/** The second pattern table. */
	Second = 1,
}

export default PatternTable;
