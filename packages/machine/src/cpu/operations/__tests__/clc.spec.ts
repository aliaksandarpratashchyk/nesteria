/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import clc from '../clc';

/**
 * Operation semantics: CLC (Clear Carry)
 * - Clears the C flag; other flags unaffected.
 */
describe(clc.name, () => {
	it('should clear the carry flag.', () => {
		const console = new Machine();
		console.cpu.carry = true;

		clc(console.cpu);

		expect(console.cpu.carry).toBeFalsy();
	});
});
