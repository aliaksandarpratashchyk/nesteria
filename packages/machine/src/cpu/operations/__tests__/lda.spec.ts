/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import lda from '../lda';

/**
 * Operation semantics: LDA (Load Accumulator)
 * - Loads A = data.
 * - Sets Z if A==0, N from bit7 of A; other flags unaffected.
 */
describe(lda.name, () => {
	describe.each`
		data    | expectedAccumulator
		${0x01} | ${0x01}
	`('when the data is $data', ({ data, expectedAccumulator }) => {
		it(`should put ${expectedAccumulator} in the accumulator.`, () => {
			const console = new Machine();

			lda(console.cpu, data);

			expect(console.cpu.accumulator).toBe(expectedAccumulator);
		});
	});
});
