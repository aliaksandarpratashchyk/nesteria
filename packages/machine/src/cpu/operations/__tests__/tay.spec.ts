/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import tay from '../tay';

/**
 * Operation semantics: TAY (Transfer Accumulator to Y)
 * - Y = A.
 * - Sets Z if Y==0, N from bit7 of Y.
 */
describe(tay.name, () => {
	describe.each`
		accumulator | expectedY | expectedNegative | expectedZero
		${0x00}     | ${0x00}   | ${false}         | ${true}
		${0x01}     | ${0x01}   | ${false}         | ${false}
		${0xff}     | ${0xff}   | ${true}          | ${false}
	`(
		'when the accumulator is $accumulator',
		({ accumulator, expectedNegative, expectedY, expectedZero }) => {
			it(
				`should put ${expectedY} into the register Y, ` +
					`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;

					tay(console.cpu);

					expect(console.cpu.y).toBe(expectedY);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
