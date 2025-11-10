/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Return from Subroutine
 *
 * S = S + 1;
 * PCL = STACK;
 * S = S + 1;
 * PCH = STACK;
 * PC = PC + 1
 *
 * Pulls the program counter from the stack, then increments it by one.
 *
 * @param cpu - CPU
 */
function rts(cpu: CPU): void {
	cpu.stackPointer++;
	cpu.programCounterLowWord = cpu.stackTop;
	cpu.stackPointer++;
	cpu.programCounterHighWord = cpu.stackTop;
	cpu.programCounter++;
}

export default rts;
