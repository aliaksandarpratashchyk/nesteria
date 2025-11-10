/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * AND then Logical Shift Right
 *
 * AND + LSR
 *
 * Unofficial opcode that combines the behaviors of AND and LSR.
 * @see {@link and} for more about AND
 * @see {@link lsr} for more about LSR
 *
 * @param cpu - CPU
 */
function alr(cpu: CPU, data: number): void {
	cpu.accumulator &= data;

	cpu.carry = !!(cpu.accumulator & 0x01);
	cpu.accumulator = (cpu.accumulator >> 1) & 0x7f;

	cpu.negative = false;
	cpu.zero = !cpu.accumulator;
}

export default alr;
