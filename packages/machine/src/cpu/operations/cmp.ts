/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Compare with Accumulator
 *
 * Subtracts the specified data from the accumulator.
 * Sets zero if the result is zero, negative if the result is negative,
 * and carry if the result is greater than or equal to zero.
 *
 * @param cpu - CPU
 */
function cmp(cpu: CPU, data: number): void {
	const result = cpu.accumulator - data;

	cpu.zero = !result;
	cpu.negative = !!(result & 0x80);
	cpu.carry = result >= 0;
}

export default cmp;
