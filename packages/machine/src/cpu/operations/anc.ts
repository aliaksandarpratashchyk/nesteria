/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * AND and move bit 7 into carry
 *
 * A = A & #immediate
 * C = A7
 *
 * Unofficial opcode that performs a bitwise AND between the
 * accumulator and the immediate argument, stores the result in A,
 * and places bit 7 of the result into the carry.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function anc(cpu: CPU, data: number): void {
	cpu.accumulator &= data;
	cpu.carry = !!(cpu.accumulator & 0x40);
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default anc;
