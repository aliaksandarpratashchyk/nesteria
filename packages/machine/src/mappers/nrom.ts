/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { Cartridge } from '../Cartridge';
import type { Mapper } from '../Mapper';

/**
 * Creates an NROM mapper for the provided cartridge.
 * @see {@link https://www.nesdev.org/wiki/NROM} for details about the NROM mapper.
 *
 * @remarks
 * Since ROM maps addresses into its own address space,
 * this mapper simply returns the cartridge's program and character ROMs.
 *
 * @param cartridge - The cartridge.
 * @returns A mapper.
 */
function nrom({ chrrom, prgrom }: Cartridge): Mapper {
	return {
		chrrom,
		prgrom,
	};
}

export default nrom;
