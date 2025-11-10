/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bit from '../bit';

/**
 * Operation semantics: BIT (Test Bits)
 * - Computes A & data; sets Z if (A & data)==0.
 * - Copies data bit7 into N and bit6 into V; C unaffected.
 */
describe(bit.name, () => {
	describe.each`
		accumulator    | data           | expectedZero | expectedNegative | expectedOverflow
		${0b0000_1111} | ${0b1111_0000} | ${true}      | ${true}          | ${true}
		${0b0000_1111} | ${0b0000_1111} | ${false}     | ${false}         | ${false}
	`(
		'when the accumulator is $accumulator and the data is $data',
		({ accumulator, data, expectedNegative, expectedOverflow, expectedZero }) => {
			it(
				`should set the zero to ${expectedZero}, ` +
					`the negative to ${expectedNegative} and the overflow to ${expectedOverflow}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;

					bit(console.cpu, data);

					expect(console.cpu.zero).toBe(expectedZero);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.overflow).toBe(expectedOverflow);
				},
			);
		},
	);
});
