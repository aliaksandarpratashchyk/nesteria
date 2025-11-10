/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import cpx from '../cpx';

/**
 * Operation semantics: CPX (Compare X)
 * - Computes X - data (no store) to set flags.
 * - Sets C if X >= data (no borrow), Z if equal, N from bit7 of (X - data).
 */
describe(cpx.name, () => {
	describe.each`
		x       | data    | expectedCPU
		${0x07} | ${0x07} | ${{ carry: true, negative: false, zero: true }}
		${0x01} | ${0x07} | ${{ carry: false, negative: true, zero: false }}
		${0x07} | ${0x01} | ${{ carry: true, negative: false, zero: false }}
		${0xf9} | ${0xf9} | ${{ carry: true, negative: false, zero: true }}
		${0xff} | ${0xff} | ${{ carry: true, negative: false, zero: true }}
	`('when the register X is $x and the data is $data', ({ data, expectedCPU, x }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();
			console.cpu.x = x;

			cpx(console.cpu, data);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
