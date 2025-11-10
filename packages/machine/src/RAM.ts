/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { ReadOnlyDevice, WriteOnlyDevice } from './Bus';

/**
 * A software representation of RAM.
 *
 * @remarks
 * Maps addresses into its own address space (mirrors by capacity).
 *
 * @public
 */
class RAM implements ReadOnlyDevice, WriteOnlyDevice {
	/**
	 * RAM capacity in bytes.
	 */
	readonly capacity: number;

	/**
	 * The raw byte buffer.
	 */
	readonly raw: Uint8Array;

	/**
	 * Constructs a new RAM instance.
	 *
	 * @param capacity - RAM capacity in bytes.
	 */
	constructor(capacity: number) {
		this.capacity = capacity;
		this.raw = new Uint8Array(this.capacity);
	}

	read(address: number): number {
		return this.raw[address % this.capacity] ?? 0;
	}

	readPage(pageNumber: number): Uint8Array {
		const start = (pageNumber & 0xff) << 8;
		const end = start + 0x100;
		return this.raw.subarray(start, end);
	}

	write(data: number, address: number): void {
		this.raw[address % this.capacity] = data;
	}

	writePage(pageNumber: number, page: Uint8Array): void {
		this.raw.set(page, pageNumber << 8);
	}
}

export default RAM;
