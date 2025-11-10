/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import eor from '../eor';

/**
 * Operation semantics: EOR (A ^= data)
 * - Bitwise exclusive-OR between accumulator and data.
 * - Sets Z if result==0, N from bit7 of result; C and V unaffected.
 */
describe(eor.name, () => {
	describe.each`
		accumulator    | data           | expectedCPU
		${0b1111_0000} | ${0b0000_1111} | ${{ accumulator: 0b1111_1111, negative: true, zero: false }}
		${0b0011_1100} | ${0b0011_1100} | ${{ accumulator: 0b0000_0000, negative: false, zero: true }}
		${0b0000_1111} | ${0b0000_0000} | ${{ accumulator: 0b0000_1111, negative: false, zero: false }}
	`(
		'when the accumulator is $accumulator and the data is $data',
		({ accumulator, data, expectedCPU }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;

				eor(console.cpu, data);

				expect(console.cpu).toMatchObject(expectedCPU);
			});
		},
	);
});
