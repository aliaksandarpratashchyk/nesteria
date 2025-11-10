/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import plp from '../plp';

/**
 * Operation semantics: PLP (Pull Processor Status)
 * - Pops a byte from stack into P (status register).
 * - Bit handling follows 6502 behavior for B and unused bits per emulator design.
 */
describe(plp.name, () => {
	describe.each`
		stack   | expectedProcessorStatus
		${0x01} | ${0x21}
	`('when $stack is on the stack', ({ expectedProcessorStatus, stack }) => {
		it(`should set the processor status to ${expectedProcessorStatus}.`, () => {
			const console = new Machine();
			console.cpu.stackTop = stack;
			console.cpu.stackPointer--;

			const previousStackPointer = console.cpu.stackPointer;
			plp(console.cpu);

			expect(console.cpu.processorStatus).toBe(expectedProcessorStatus);
			expect(console.cpu.stackPointer).toBe(previousStackPointer + 1);
		});
	});
});
