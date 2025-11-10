/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * PusH Accumulator
 *
 * STACK = A;
 * S = S - 1
 *
 * Stores the contents of accumulator into the stack, then updates stack pointer.
 *
 * @param cpu - CPU
 */
function pha(cpu: CPU): void {
	cpu.stackTop = cpu.accumulator;
	cpu.stackPointer--;
}

export default pha;
