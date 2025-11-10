/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import cmp from '../cmp';

/**
 * Operation semantics: CMP (Compare Accumulator)
 * - Computes A - data (no store) to set flags.
 * - Sets C if A >= data (no borrow), Z if equal, N from bit7 of (A - data).
 */
describe(cmp.name, () => {
	describe.each`
		accumulator | data    | expectedCPU
		${0x07}     | ${0x07} | ${{ carry: true, negative: false, zero: true }}
		${0x01}     | ${0x07} | ${{ carry: false, negative: true, zero: false }}
		${0x07}     | ${0x01} | ${{ carry: true, negative: false, zero: false }}
		${0xf9}     | ${0xf9} | ${{ carry: true, negative: false, zero: true }}
		${0xff}     | ${0xff} | ${{ carry: true, negative: false, zero: true }}
		${0xf9}     | ${0xf9} | ${{ carry: true, negative: false, zero: true }}
	`(
		'when the accumulator is $accumulator and the data is $data',
		({ accumulator, data, expectedCPU }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;

				cmp(console.cpu, data);

				expect(console.cpu).toMatchObject(expectedCPU);
			});
		},
	);
});
