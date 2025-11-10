/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Jump to Subroutine
 *
 * STACK = PC + 2
 * PC = ADDRESS
 *
 * Stores the return address on the stack, then sets the PC to the new address.
 *
 * @param cpu - CPU
 */
function jsr(cpu: CPU, address: number): void {
	cpu.programCounter--;
	cpu.stackTop = cpu.programCounterHighWord;
	cpu.stackPointer--;
	cpu.stackTop = cpu.programCounterLowWord;
	cpu.stackPointer--;

	cpu.programCounter = address;
}

export default jsr;
