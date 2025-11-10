/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Exclusive OR with accumulator
 *
 * A = A XOR DATA
 *
 * Performs exclusive OR operation on the contents of accumulator and the specified data.
 * Stores the result back into accumulator.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function eor(cpu: CPU, data: number): void {
	cpu.accumulator ^= data;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default eor;
