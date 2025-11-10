/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Absolute,Y addressing mode.
 * Forms a 16‑bit base address from the next two bytes, adds Y.
 * Applies a page‑crossing penalty when `extraCycles` is true.
 */
function absoluteY(cpu: CPU, extraCycles = 0): number {
	const nonIndexedAddress =
		cpu.bus.read(cpu.programCounter++) | (cpu.bus.read(cpu.programCounter++) << 8);
	const indexedAddress = (nonIndexedAddress + cpu.y) & 0xffff;

	if ((indexedAddress & 0xff00) !== (nonIndexedAddress & 0xff00)) cpu.cycles += extraCycles;

	return indexedAddress;
}

export default absoluteY;
