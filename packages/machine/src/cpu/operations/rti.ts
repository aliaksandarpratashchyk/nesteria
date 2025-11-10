/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Return from Interrupt
 *
 * S = S + 1;
 * P = STACK;
 * S = S + 1;
 * PCL = STACK;
 * S = S + 1;
 * PCH = STACK
 *
 * Pulls the processor status and the program counter from the stack and adjusts the stack pointer.
 *
 * @param cpu - CPU
 */
function rti(cpu: CPU): void {
	cpu.stackPointer++;
	cpu.processorStatus = cpu.stackTop;
	cpu.stackPointer++;
	cpu.programCounterLowWord = cpu.stackTop;
	cpu.stackPointer++;
	cpu.programCounterHighWord = cpu.stackTop;
}

export default rti;
