/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Load X register
 *
 * Loads the contents of the specified memory location or immediate into the register X.
 *
 * @remarks
 * Affects the negative and zero flags.
 *
 * @param cpu - CPU
 */
function ldx(cpu: CPU, data: number): void {
	cpu.x = data;
	cpu.negative = !!(data & 0x80);
	cpu.zero = !data;
}

export default ldx;
