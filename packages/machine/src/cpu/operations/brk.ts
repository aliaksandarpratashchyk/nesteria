/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Break
 *
 * Performs software interrupt.
 * 1. Pushs program counter + 2 on the stack.
 * 2. Then pushs processor status on the stack.
 * 3. Sets contents of the memory location 0xFFFE/0xFFFF as a new program counter.
 * 4. Sets interrupt flag.
 *
 * @remarks
 * Sets break flag before pushing processor status on the stack.
 *
 * @param cpu - CPU
 */
function brk(cpu: CPU): void {
	cpu.break = true;

	cpu.programCounter += 2;
	cpu.stackTop = cpu.programCounterHighWord;
	cpu.stackPointer--;

	cpu.stackTop = cpu.programCounterLowWord;
	cpu.stackPointer--;

	cpu.stackTop = cpu.processorStatus;
	cpu.stackPointer--;

	cpu.interrupt = true;

	cpu.programCounter = (cpu.bus.read(0xffff) << 8) | cpu.bus.read(0xfffe);
}

export default brk;
