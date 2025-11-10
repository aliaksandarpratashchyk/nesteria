/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Add with Carry
 *
 * A = A + DATA + C
 *
 * Adds the specified data to the accumulator plus the carry bit.
 * Stores the result in the accumulator.
 *
 * @remarks
 * Affects negative, overflow, zero, and carry flags.
 *
 * @remarks
 * Supports only binary mode.
 *
 * @param cpu - CPU
 */
function adc(cpu: CPU, data: number): void {
	const result = cpu.accumulator + data + +cpu.carry;

	cpu.negative = !!(result & 0x80);
	cpu.overflow = !!((cpu.accumulator ^ result) & (data ^ result) & 0x80);

	cpu.zero = !(result & 0xff);
	cpu.carry = !!(result & 0x100);

	cpu.accumulator = result & 0xff;
}

export default adc;
