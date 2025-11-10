/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import rla from '../rla';

const SOMEWHERE = 0x0042;

/**
 * Operation semantics: RLA (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(rla.name, () => {
	describe.each`
		carry    | accumulator | data    | expectedCPU                                                         | expectedMemory
		${false} | ${0x00}     | ${0x80} | ${{ accumulator: 0x00, carry: true, negative: false, zero: true }}  | ${0x00}
		${true}  | ${0xff}     | ${0x7f} | ${{ accumulator: 0xff, carry: false, negative: true, zero: false }} | ${0xff}
	`(
		'when C=$carry, accumulator=$accumulator and data=$data',
		({ accumulator, carry, data, expectedCPU, expectedMemory }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)} and write ${expectedMemory} to memory`, () => {
				const console = new Machine();
				console.cpu.carry = carry;
				console.cpu.accumulator = accumulator;

				rla(console.cpu, SOMEWHERE, data);

				expect(console.cpu).toMatchObject(expectedCPU);
				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			});
		},
	);
});
