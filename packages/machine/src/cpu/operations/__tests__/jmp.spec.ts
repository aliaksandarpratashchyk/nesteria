/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import jmp from '../jmp';

/**
 * Operation semantics: JMP (Jump)
 * - Sets PC to target address; flags unaffected.
 */
describe(jmp.name, () => {
	describe.each`
		address   | expectedProgramCounter
		${0xfffe} | ${0xfffe}
	`('when the address is $address', ({ address, expectedProgramCounter }) => {
		it(`should point the program counter to ${expectedProgramCounter}.`, () => {
			const console = new Machine();

			jmp(console.cpu, address);

			expect(console.cpu.programCounter).toBe(expectedProgramCounter);
		});
	});
});
