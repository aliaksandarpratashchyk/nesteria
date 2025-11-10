/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import slo from '../slo';

const SOMEWHERE = 0x0040;

/**
 * Operation semantics: SLO (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(slo.name, () => {
	describe.each`
		accumulator | data    | expectedCPU                                                          | expectedMemory
		${0x00}     | ${0x80} | ${{ accumulator: 0x00, carry: true, negative: false, zero: true }}   | ${0x00}
		${0x7f}     | ${0x01} | ${{ accumulator: 0x7f, carry: false, negative: false, zero: false }} | ${0x02}
	`(
		'when accumulator=$accumulator and data=$data',
		({ accumulator, data, expectedCPU, expectedMemory }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)} and write ${expectedMemory} to memory`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;

				slo(console.cpu, SOMEWHERE, data);

				expect(console.cpu).toMatchObject(expectedCPU);
				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			});
		},
	);
});
