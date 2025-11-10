/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import txa from '../txa';

/**
 * Operation semantics: TXA (Transfer X to Accumulator)
 * - A = X.
 * - Sets Z if A==0, N from bit7 of A.
 */
describe(txa.name, () => {
	describe.each`
		x       | expectedAccumulator | expectedNegative | expectedZero
		${0xff} | ${0xff}             | ${true}          | ${false}
		${0x00} | ${0x00}             | ${false}         | ${true}
		${0x01} | ${0x01}             | ${false}         | ${false}
	`('when x is $x', ({ expectedAccumulator, expectedNegative, expectedZero, x }) => {
		it(
			`should put ${expectedAccumulator} into the accumulator, ` +
				`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
			() => {
				const console = new Machine();
				console.cpu.x = x;

				txa(console.cpu);

				expect(console.cpu.accumulator).toBe(expectedAccumulator);
				expect(console.cpu.negative).toBe(expectedNegative);
				expect(console.cpu.zero).toBe(expectedZero);
			},
		);
	});
});
