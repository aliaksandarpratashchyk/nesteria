/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sta from '../sta';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: STA (Store Accumulator)
 * - Writes A to the effective address.
 * - Does not modify any flags.
 */
describe(sta.name, () => {
	describe.each`
		accumulator | expectedMemory
		${0x01}     | ${0x01}
	`('when the accumulator is $accumulator', ({ accumulator, expectedMemory }) => {
		it(`should store ${expectedMemory} in the memory.`, () => {
			const console = new Machine();
			console.cpu.accumulator = accumulator;

			sta(console.cpu, SOMEWHERE);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
		});
	});
});
