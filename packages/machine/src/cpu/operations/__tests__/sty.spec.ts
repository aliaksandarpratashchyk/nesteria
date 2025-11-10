/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sty from '../sty';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: STY (Store Y)
 * - Writes Y to the effective address.
 * - Does not modify any flags.
 */
describe(sty.name, () => {
	describe.each`
		y       | expectedMemory
		${0x01} | ${0x01}
	`('when the register Y is $y', ({ expectedMemory, y }) => {
		it(`should store ${expectedMemory} in the memory.`, () => {
			const console = new Machine();
			console.cpu.y = y;

			sty(console.cpu, SOMEWHERE);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
		});
	});
});
