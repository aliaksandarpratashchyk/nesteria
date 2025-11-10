/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

import { BREAK_FLAG_MASK, UNUSED_FLAG_MASK } from '../flags';

/**
 * Push Processor Status
 *
 * STACK = P;
 * S = S - 1
 *
 * Stores the processor status on the stack, then updates the stack pointer.
 *
 * @remarks
 * Sets the unused and break flags in the value pushed to the stack.
 *
 * @param cpu - CPU
 */
function php(cpu: CPU): void {
	cpu.stackTop = cpu.processorStatus | UNUSED_FLAG_MASK | BREAK_FLAG_MASK;
	cpu.stackPointer--;
}

export default php;
