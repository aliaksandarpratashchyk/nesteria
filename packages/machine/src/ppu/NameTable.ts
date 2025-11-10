/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * One of the four possible nametables.
 * @see {@link https://www.nesdev.org/wiki/PPU_nametables} for details about nametables.
 *
 * @remarks Definitions match the corresponding bits in the PPUCTRL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * @public
 */
enum NameTable {
	/** Bottom-left nametable. */
	BottomLeft = 2,

	/** Bottom-right nametable. */
	BottomRight = 3,

	/** Top-left nametable. */
	TopLeft = 0,

	/** Top-right nametable. */
	TopRight = 1,
}

export default NameTable;
