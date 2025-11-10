/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import clv from '../clv';

/**
 * Operation semantics: CLV (Clear Overflow)
 * - Clears the V flag; other flags unaffected.
 */
describe(clv.name, () => {
	it('should clear the overflow flag.', () => {
		const console = new Machine();
		console.cpu.overflow = true;

		clv(console.cpu);

		expect(console.cpu.overflow).toBeFalsy();
	});
});
