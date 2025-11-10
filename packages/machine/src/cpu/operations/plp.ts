/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

import { BREAK_FLAG_MASK, UNUSED_FLAG_MASK } from '../flags';

/**
 * Pull Processor Status from stack
 *
 * Increments the stack pointer, then pulls the top byte from the stack into the processor status.
 *
 * @remarks
 * Ensures the unused flag is set and the break flag is clear in the resulting status.
 *
 * @param cpu - CPU
 */
function plp(cpu: CPU): void {
	cpu.stackPointer++;
	cpu.processorStatus = (cpu.stackTop | UNUSED_FLAG_MASK) & ~BREAK_FLAG_MASK;
}

export default plp;
