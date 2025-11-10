/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import ldy from '../ldy';

/**
 * Operation semantics: LDY (Load Y)
 * - Loads Y = data.
 * - Sets Z if Y==0, N from bit7 of Y; other flags unaffected.
 */
describe(ldy.name, () => {
	describe.each`
		data    | expectedY
		${0x01} | ${0x01}
	`('when the data is $data', ({ data, expectedY }) => {
		it(`should put ${expectedY} in the register Y.`, () => {
			const console = new Machine();

			ldy(console.cpu, data);

			expect(console.cpu.y).toBe(expectedY);
		});
	});
});
