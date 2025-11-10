/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

function absolute(cpu: CPU): number {
	return cpu.bus.read(cpu.programCounter++) | (cpu.bus.read(cpu.programCounter++) << 8);
}

export default absolute;
