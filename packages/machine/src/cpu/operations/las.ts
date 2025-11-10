/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Load A, X, and S from (memory AND stack pointer)
 *
 * A = X = SP = M & SP
 *
 * Unofficial opcode that loads the accumulator, X, and stack pointer
 * with (data AND stack pointer).
 *
 * @remarks
 * Affects the negative and zero flags.
 *
 * @remarks
 * Also known as LAR.
 *
 * @param cpu - CPU
 */
function las(cpu: CPU, data: number): void {
	const result = data & cpu.stackPointer;

	cpu.accumulator = result;
	cpu.x = result;
	cpu.stackPointer = result;
	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default las;
