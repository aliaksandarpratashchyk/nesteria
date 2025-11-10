/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

function indirect(cpu: CPU): number {
	const pointer = cpu.bus.read(cpu.programCounter++) | (cpu.bus.read(cpu.programCounter++) << 8);

	// eslint-disable-next-line no-negated-condition
	return (pointer & 0xff) !== 0xff
		? cpu.bus.read(pointer) | (cpu.bus.read((pointer + 1) & 0xffff) << 8)
		: cpu.bus.read(pointer) | (cpu.bus.read(pointer & 0xff00) << 8);
}

export default indirect;
