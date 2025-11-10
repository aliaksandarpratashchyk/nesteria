/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sec from '../sec';

/**
 * Operation semantics: SEC (Set Carry)
 * - Sets the C flag; other flags unaffected.
 */
describe(sec.name, () => {
	it('should set the carry flag.', () => {
		const console = new Machine();
		console.cpu.carry = false;

		sec(console.cpu);

		expect(console.cpu.carry).toBeTruthy();
	});
});
