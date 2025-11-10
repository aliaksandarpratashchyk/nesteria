/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import pla from '../pla';

/**
 * Operation semantics: PLA (Pull Accumulator)
 * - Pops a byte from stack into A.
 * - Sets Z if A==0, N from bit7 of A.
 */
describe(pla.name, () => {
	describe.each`
		stack   | expectedAccumulator
		${0x01} | ${0x01}
	`('when $stack on the stack', ({ expectedAccumulator, stack }) => {
		it(`should put ${expectedAccumulator} to the accumulator.`, () => {
			const console = new Machine();
			console.cpu.stackTop = stack;
			console.cpu.stackPointer--;

			const previuosStackPointer = console.cpu.stackPointer;
			pla(console.cpu);

			expect(console.cpu.accumulator).toBe(expectedAccumulator);
			expect(console.cpu.stackPointer).toBe(previuosStackPointer + 1);
		});
	});
});
