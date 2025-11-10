/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import tax from '../tax';

/**
 * Operation semantics: TAX (Transfer Accumulator to X)
 * - X = A.
 * - Sets Z if X==0, N from bit7 of X.
 */
describe(tax.name, () => {
	describe.each`
		accumulator | expectedX | expectedNegative | expectedZero
		${0x00}     | ${0x00}   | ${false}         | ${true}
		${0x01}     | ${0x01}   | ${false}         | ${false}
		${0xff}     | ${0xff}   | ${true}          | ${false}
	`(
		'when the accumulator is $accumulator',
		({ accumulator, expectedNegative, expectedX, expectedZero }) => {
			it(
				`should put ${expectedX} into the register X, ` +
					`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;

					tax(console.cpu);

					expect(console.cpu.x).toBe(expectedX);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
