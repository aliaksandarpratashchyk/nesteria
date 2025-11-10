/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sax from '../sax';

const SOMEWHERE = 0x0001;

describe(sax.name, () => {
	describe.each`
		accumulator | x       | expectedMemory
		${0xf0}     | ${0x0f} | ${0x00}
		${0xff}     | ${0xff} | ${0xff}
	`('when accumulator=$accumulator and X=$x', ({ accumulator, expectedMemory, x }) => {
		it(`should store ${expectedMemory} in memory`, () => {
			const console = new Machine();
			console.cpu.accumulator = accumulator;
			console.cpu.x = x;

			sax(console.cpu, SOMEWHERE);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
		});
	});
});
