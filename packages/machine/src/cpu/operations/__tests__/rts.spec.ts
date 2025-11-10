/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import rts from '../rts';

/**
 * Operation semantics: RTS (Return from Subroutine)
 * - Pulls PC from stack (low, then high), then increments PC by 1.
 */
describe(rts.name, () => {
	describe.each`
		stack0  | stack1  | expectedProgramCounter
		${0x01} | ${0x01} | ${0x02}
	`('when $stack0, $stack1 is on the stack', ({ expectedProgramCounter, stack0, stack1 }) => {
		it(`should point the program counter to ${expectedProgramCounter}.`, () => {
			const console = new Machine();
			console.cpu.stackPointer--;
			console.cpu.stackTop = stack1;
			console.cpu.stackPointer--;
			console.cpu.stackTop = stack0;

			rts(console.cpu);

			expect(console.cpu.programCounter).toBe(expectedProgramCounter);
		});
	});
});
