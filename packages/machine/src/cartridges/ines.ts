/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { MapperTable } from '../Mapper';

import { type Cartridge, INES } from '../Cartridge';
import nrom from '../mappers/nrom';
import NameTableMirroring from '../ppu/NameTableMirroring';
import ROM from '../ROM';

/**
 * "iNES" file signature.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about iNES file format.
 */
export const INES_SIGNATURE = 'NES\x1A';

/**
 * "iNES" file header size (16 bytes).
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the iNES file format.
 */
export const HEADER_SIZE =
	4 + // Signature
	1 + // Program bank count
	1 + // Character bank count
	1 + // Flags6
	1 + // Flags7
	1 + // PRGRAM size
	1 + // TV system 1
	1 + // TV system 2
	5; // Unused

/**
 * "iNES" trainer size.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the "iNES" file format.
 */
export const TRAINER_SIZE = 512;

/**
 * "iNES" program ROM bank size.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the "iNES" file format.
 */
export const PRGROM_BANK_SIZE = 16 * 1024;

/**
 * "iNES" character ROM bank size.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the "iNES" file format.
 */
export const CHRROM_BANK_SIZE = 8 * 1024;

/**
 * "iNES" mapper table.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the "iNES" file format.
 */
export const INES_MAPPER_TABLE: MapperTable = [nrom];

/**
 * Reads a game in the "iNES" format.
 * @see {@link https://www.nesdev.org/wiki/INES} for more about the "iNES" file format.
 *
 * @remarks
 * Currently supports only the minimum required to run a game.
 *
 * @param buffer - The ROM image buffer.
 * @returns A cartridge.
 *
 * @public
 */
function ines(buffer: Uint8Array): Cartridge {
	const signature = String.fromCodePoint(
		buffer[0] ?? 0,
		buffer[1] ?? 0,
		buffer[2] ?? 0,
		buffer[3] ?? 0,
	);

	if (signature !== INES_SIGNATURE)
		throw new Error(
			`Can't verify iNES file signature: got "${signature}" instead of "${INES_SIGNATURE}".`,
		);

	const prgromBankCount = buffer[4] ?? 0;
	const chrromBankCount = buffer[5] ?? 0;
	const flags6 = buffer[6] ?? 0;
	const flags7 = buffer[7] ?? 0;

	const mapper = (flags7 & 0xf0) | (flags6 >> 4);

	let mirroring = NameTableMirroring.Horizontal;

	if (flags6 & 0x08) mirroring = NameTableMirroring.FourScreen;
	else if ((flags6 & 0x01) === 1) mirroring = NameTableMirroring.Vertical;

	const trainer = flags6 & 0x04;

	const prgromOffset = HEADER_SIZE + (trainer ? TRAINER_SIZE : 0);
	const prgromSize = prgromBankCount * PRGROM_BANK_SIZE;

	const prgrom = new ROM(buffer.subarray(prgromOffset, prgromOffset + prgromSize));

	const chrromOffset = prgromOffset + prgromSize;
	const chrromSize = chrromBankCount * CHRROM_BANK_SIZE;

	const chrrom = new ROM(
		chrromBankCount > 0
			? buffer.subarray(chrromOffset, chrromOffset + chrromSize)
			: new Uint8Array(CHRROM_BANK_SIZE),
	);

	return {
		chrrom,
		mapper,
		mirroring,
		prgrom,
		type: INES,
	};
}

export default ines;
