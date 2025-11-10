/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import and from '../and';

/**
 * Operation semantics: AND (A &= data)
 * - Bitwise AND between accumulator and data.
 * - Sets Z if result==0, N from bit7 of result; C and V unaffected.
 */
describe(and.name, () => {
	describe.each`
		accumulator    | data           | expectedAccumulator | expectedNegative | expectedZero
		${0b1111_0000} | ${0b0000_1111} | ${0b0000_0000}      | ${false}         | ${true}
		${0b1111_0000} | ${0b0011_1100} | ${0b0011_0000}      | ${false}         | ${false}
		${0b1111_0000} | ${0b1100_0011} | ${0b1100_0000}      | ${true}          | ${false}
	`(
		'when the accumulator is $accumulator and the data is $data',
		({ accumulator, data, expectedAccumulator, expectedNegative, expectedZero }) => {
			it(
				`should set the accumulator to ${expectedAccumulator}, ` +
					`the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;

					and(console.cpu, data);

					expect(console.cpu.accumulator).toBe(expectedAccumulator);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
