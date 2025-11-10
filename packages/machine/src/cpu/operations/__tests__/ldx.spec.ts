/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import ldx from '../ldx';

/**
 * Operation semantics: LDX (Load X)
 * - Loads X = data.
 * - Sets Z if X==0, N from bit7 of X; other flags unaffected.
 */
describe(ldx.name, () => {
	describe.each`
		data    | expectedX
		${0x01} | ${0x01}
	`('when the data is $data', ({ data, expectedX }) => {
		it(`should put ${expectedX} in the register X.`, () => {
			const console = new Machine();

			ldx(console.cpu, data);

			expect(console.cpu.x).toBe(expectedX);
		});
	});
});
