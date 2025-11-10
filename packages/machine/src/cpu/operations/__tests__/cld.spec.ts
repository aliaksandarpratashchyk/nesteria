/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import cld from '../cld';

/**
 * Operation semantics: CLD (Clear Decimal)
 * - Clears the D flag; NES CPU ignores decimal mode for arithmetic, but the bit exists.
 */
describe(cld.name, () => {
	it('should clear the decimal flag.', () => {
		const console = new Machine();
		console.cpu.decimal = true;

		cld(console.cpu);

		expect(console.cpu.decimal).toBeFalsy();
	});
});
