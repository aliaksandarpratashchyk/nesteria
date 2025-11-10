/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * (Indirect),Y addressing mode.
 * Reads a zero‑page pointer, fetches a 16‑bit base address, then adds Y.
 * Applies a page‑crossing penalty when `extraCycles` is true.
 */
function indirectY(cpu: CPU, extraCycles = 0): number {
	const indirectAddress = cpu.bus.read(cpu.programCounter++);
	const nonIndexedAddress =
		cpu.bus.read(indirectAddress) | (cpu.bus.read((indirectAddress + 1) & 0xff) << 8);
	const indexedAddress = (nonIndexedAddress + cpu.y) & 0xffff;

	if ((indexedAddress & 0xff) !== (nonIndexedAddress & 0xff)) cpu.cycles += extraCycles;

	return indexedAddress;
}

export default indirectY;
