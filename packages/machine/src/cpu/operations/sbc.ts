/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * SuBtrack with Carry
 *
 * A = A - DATA - !C
 *
 * Substracts from the accumulator the data at the specified address with borrow.
 *
 * @remarks
 * Affects negative, overflow, zero and carry flags.
 *
 * @remarks
 * Supports only binary mode.
 *
 * @param cpu - CPU
 */
function sbc(cpu: CPU, data: number): void {
	const result = cpu.accumulator - data - (1 - +cpu.carry);

	cpu.negative = !!(result & 0x80);
	cpu.overflow = !!((cpu.accumulator ^ result) & (data ^ 0xff ^ result) & 0x80);

	cpu.zero = !(result & 0xff);
	cpu.carry = !(result & 0xff00);

	cpu.accumulator = result & 0xff;
}

export default sbc;
