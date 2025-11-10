/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Accumulator AND X, then subtract immediate
 *
 * X = (A & X) - #immediate
 *
 * Unofficial opcode that performs a bitwise AND between the accumulator
 * and the X register, then subtracts the immediate argument from the result
 * and stores it in X.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function axs(cpu: CPU, data: number): void {
	const result = (cpu.accumulator & cpu.x) - data;

	cpu.x = result & 0xff;
	cpu.carry = result >= 0;
	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default axs;
