/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import rti from '../rti';

/**
 * Operation semantics: RTI (Return from Interrupt)
 * - Pulls P from stack, then pulls PC (low, then high) from stack.
 * - Restores processor state as it was before interrupt/BRK.
 */
describe(rti.name, () => {
	describe.each`
		stack0  | stack1  | stack2  | expectedProcessorStatus | expectedProgramCounter
		${0xff} | ${0x01} | ${0x01} | ${0x21}                 | ${0x0001}
	`(
		'when $stack0, $stack1, $stack2 is on the stack',
		({ expectedProcessorStatus, expectedProgramCounter, stack0, stack1, stack2 }) => {
			it(
				`should set the processor status to ${expectedProcessorStatus} ` +
					`and point the program counter to ${expectedProgramCounter}.`,
				() => {
					const console = new Machine();
					console.cpu.stackPointer--;
					console.cpu.stackTop = stack2;
					console.cpu.stackPointer--;
					console.cpu.stackTop = stack1;
					console.cpu.stackPointer--;
					console.cpu.stackTop = stack0;

					rti(console.cpu);

					expect(console.cpu.processorStatus).toBe(expectedProcessorStatus);
					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
				},
			);
		},
	);
});
