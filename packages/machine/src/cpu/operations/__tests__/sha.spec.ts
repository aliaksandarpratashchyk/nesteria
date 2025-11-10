/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sha from '../sha';

/**
 * Operation semantics: SHA (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(sha.name, () => {
	describe.each`
		accumulator | x       | address   | expectedMemory
		${0xff}     | ${0xff} | ${0x0102} | ${0x02}
	`(
		'when accumulator=$accumulator, X=$x and address=$address',
		({ accumulator, address, expectedMemory, x }) => {
			it(`should store ${expectedMemory} in memory`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;
				console.cpu.x = x;

				sha(console.cpu, address);

				expect(console.cpu.bus.read(address)).toBe(expectedMemory);
			});
		},
	);
});
