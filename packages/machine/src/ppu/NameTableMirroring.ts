/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * Nametable mirroring.
 * @see {@link https://www.nesdev.org/wiki/Mirroring} for details about nametable mirroring.
 *
 * @public
 */
enum NameTableMirroring {
	/**
	 * Four-screen.
	 */
	FourScreen = 2,

	/**
	 * Horizontal.
	 */
	Horizontal = 0,

	/**
	 * Vertical.
	 */
	Vertical = 1,
}

export default NameTableMirroring;
