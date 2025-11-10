/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Pull Accumulator
 *
 * S = S + 1;
 * A = STACK
 *
 * Increments the stack pointer, then pulls the top byte from the stack into A.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function pla(cpu: CPU): void {
	cpu.stackPointer++;
	cpu.accumulator = cpu.stackTop;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default pla;
