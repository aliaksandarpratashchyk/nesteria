/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { ReadOnlyDevice } from './Bus';

/**
 * Read-only memory.
 *
 * @remarks
 * Maps addresses into its own address space (mirrors by length).
 *
 * @public
 */
class ROM implements ReadOnlyDevice {
	readonly raw: Uint8Array;

	constructor(raw: Uint8Array) {
		this.raw = raw;
	}

	read(address: number): number {
		return this.raw[address % this.raw.length] ?? 0;
	}
}

export default ROM;
