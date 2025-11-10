/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type NameTableMirroring from './ppu/NameTableMirroring';
import type ROM from './ROM';

/**
 * Cartridge type identifier for iNES format.
 *
 * @public
 */
export const INES = 'iNES';

/**
 * A generalized representation of a game cartridge.
 *
 * @public
 */
export interface Cartridge {
	/**
	 * All available character ROM.
	 */
	chrrom: ROM;

	/**
	 * The mapper identifier.
	 */
	mapper: number;

	/**
	 * Nametable mirroring.
	 */
	mirroring: NameTableMirroring;

	/**
	 * All available program ROM.
	 */
	prgrom: ROM;

	/**
	 * The cartridge type.
	 */
	type: CartridgeType;
}

/**
 * Possible cartridge types.
 *
 * @public
 */
export type CartridgeType = typeof INES;
