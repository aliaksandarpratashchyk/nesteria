/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Logical AND
 *
 * A = A & DATA
 *
 * Performs the logical AND of the accumulator and specified data.
 * The result is left in the accumulator.
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function and(cpu: CPU, data: number): void {
	cpu.accumulator &= data;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default and;
