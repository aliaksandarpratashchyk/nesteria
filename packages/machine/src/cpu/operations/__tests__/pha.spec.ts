/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import pha from '../pha';

/**
 * Operation semantics: PHA (Push Accumulator)
 * - Pushes A to the stack.
 * - Flags are not modified by the push itself.
 */
describe(pha.name, () => {
	describe.each`
		accumulator | expectedStack
		${0x01}     | ${0x01}
	`('when the accumulator is $accumulator', ({ accumulator, expectedStack }) => {
		it(`should push ${expectedStack} on the stack.`, () => {
			const console = new Machine();
			console.cpu.accumulator = accumulator;

			pha(console.cpu);

			console.cpu.stackPointer++;
			expect(console.cpu.stackTop).toBe(expectedStack);
		});
	});
});
