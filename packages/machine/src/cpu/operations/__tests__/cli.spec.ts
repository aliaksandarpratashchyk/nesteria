/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import cli from '../cli';

/**
 * Operation semantics: CLI (Clear Interrupt Disable)
 * - Clears the I flag, enabling maskable IRQs.
 */
describe(cli.name, () => {
	it('should clear the interrupt flag.', () => {
		const console = new Machine();
		console.cpu.interrupt = true;

		cli(console.cpu);

		expect(console.cpu.interrupt).toBeFalsy();
	});
});
