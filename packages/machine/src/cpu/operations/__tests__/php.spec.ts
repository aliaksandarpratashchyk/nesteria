/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import php from '../php';

/**
 * Operation semantics: PHP (Push Processor Status)
 * - Pushes P to the stack (with B flag behavior per 6502 when applicable).
 * - Flags are not modified by the push itself.
 */
describe(php.name, () => {
	describe.each`
		processorStatus | expectedStack
		${0xff}         | ${0xff}
	`('when the processor status is $processorStatus', ({ expectedStack, processorStatus }) => {
		it(`should push ${expectedStack} on the stack.`, () => {
			const console = new Machine();
			console.cpu.processorStatus = processorStatus;

			php(console.cpu);

			console.cpu.stackPointer++;
			expect(console.cpu.stackTop).toBe(expectedStack);
		});
	});
});
