/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Inclusive OR with Accumulator
 *
 * A = A | DATA
 *
 * Performs inclusive OR between the accumulator and the specified data,
 * then stores the result back into A.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function ora(cpu: CPU, data: number): void {
	cpu.accumulator |= data;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default ora;
