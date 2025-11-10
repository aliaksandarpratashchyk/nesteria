/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sei from '../sei';

/**
 * Operation semantics: SEI (Set Interrupt Disable)
 * - Sets the I flag, disabling maskable IRQs.
 */
describe(sei.name, () => {
	it('should set the interrupt flag.', () => {
		const console = new Machine();
		console.cpu.interrupt = false;

		sei(console.cpu);

		expect(console.cpu.interrupt).toBeTruthy();
	});
});
