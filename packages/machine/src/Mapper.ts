/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { Device } from './Bus';
import type { Cartridge } from './Cartridge';

/**
 * Factory type for creating mappers.
 */
export type CreateMapper = (cartridge: Cartridge) => Mapper;

/**
 * A software representation of a cartridge mapper.
 */
export interface Mapper {
	/**
	 * Character ROM mapping.
	 */
	chrrom: Device;

	/**
	 * Program ROM mapping.
	 */
	prgrom: Device;
}

/**
 * Table of mappers.
 */
export type MapperTable = CreateMapper[];

/**
 * Base class for program or character ROM mappers.
 */
export abstract class ROMMapper {
	readonly cartridge: Cartridge;

	constructor(cartridge: Cartridge) {
		this.cartridge = cartridge;
	}
}
