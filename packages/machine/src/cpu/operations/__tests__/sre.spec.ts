/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sre from '../sre';

const SOMEWHERE = 0x0044;

/**
 * Operation semantics: SRE (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(sre.name, () => {
	describe.each`
		accumulator | data    | expectedCPU                                                          | expectedMemory
		${0xff}     | ${0x01} | ${{ accumulator: 0xff, carry: true, negative: true, zero: false }}   | ${0x00}
		${0x00}     | ${0x02} | ${{ accumulator: 0x01, carry: false, negative: false, zero: false }} | ${0x01}
	`(
		'when accumulator=$accumulator and data=$data',
		({ accumulator, data, expectedCPU, expectedMemory }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)} and write ${expectedMemory} to memory`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;

				sre(console.cpu, SOMEWHERE, data);

				expect(console.cpu).toMatchObject(expectedCPU);
				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			});
		},
	);
});
