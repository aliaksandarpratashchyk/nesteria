/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import tya from '../tya';

/**
 * Operation semantics: TYA (Transfer Y to Accumulator)
 * - A = Y.
 * - Sets Z if A==0, N from bit7 of A.
 */
describe(tya.name, () => {
	describe.each`
		y       | expectedCPU
		${0xff} | ${{ accumulator: 0xff, negative: true, zero: false }}
		${0x00} | ${{ accumulator: 0x00, negative: false, zero: true }}
		${0x01} | ${{ accumulator: 0x01, negative: false, zero: false }}
	`('when the register Y is $y', ({ expectedCPU, y }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();
			console.cpu.y = y;

			tya(console.cpu);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
