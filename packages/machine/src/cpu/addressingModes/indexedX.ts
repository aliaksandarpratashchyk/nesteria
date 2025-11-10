/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

function indexedX(cpu: CPU): number {
	const indirectAddress = (cpu.bus.read(cpu.programCounter++) + cpu.x) & 0xff;

	return cpu.bus.read(indirectAddress) | (cpu.bus.read((indirectAddress + 1) & 0xff) << 8);
}

export default indexedX;
