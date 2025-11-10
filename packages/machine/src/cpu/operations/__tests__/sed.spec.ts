/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sed from '../sed';

/**
 * Operation semantics: SED (Set Decimal)
 * - Sets the D flag; NES CPU ignores decimal mode for arithmetic, but the bit exists.
 */
describe(sed.name, () => {
	it('should set the decimal flag.', () => {
		const console = new Machine();
		console.cpu.decimal = false;

		sed(console.cpu);

		expect(console.cpu.decimal).toBeTruthy();
	});
});
