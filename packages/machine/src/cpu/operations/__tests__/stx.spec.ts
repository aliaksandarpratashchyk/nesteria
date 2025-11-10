/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import stx from '../stx';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: STX (Store X)
 * - Writes X to the effective address.
 * - Does not modify any flags.
 */
describe(stx.name, () => {
	describe.each`
		x       | expectedMemory
		${0x01} | ${0x01}
	`('when the register X is $x', ({ expectedMemory, x }) => {
		it(`should store ${expectedMemory} in the memory.`, () => {
			const console = new Machine();
			console.cpu.x = x;

			stx(console.cpu, SOMEWHERE);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
		});
	});
});
