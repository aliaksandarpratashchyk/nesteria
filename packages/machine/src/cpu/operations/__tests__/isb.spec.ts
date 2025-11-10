/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import isb from '../isb';

const SOMEWHERE = 0x0020;

/**
 * Operation semantics: ISB (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(isb.name, () => {
	describe.each`
		accumulator | carry   | data    | expectedCPU                                                         | expectedMemory
		${0x10}     | ${true} | ${0x01} | ${{ accumulator: 0x0e, carry: true, negative: false, zero: false }} | ${0x02}
	`(
		'when A=$accumulator, C=$carry and data=$data',
		({ accumulator, carry, data, expectedCPU, expectedMemory }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)} and write ${expectedMemory} to memory`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;
				console.cpu.carry = carry;

				isb(console.cpu, SOMEWHERE, data);

				expect(console.cpu).toMatchObject(expectedCPU);
				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			});
		},
	);
});
