/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import absolute from '../absolute';

/*
 * Addressing semantics: absolute
 * - Forms a 16-bit address from the next two bytes (low, then high).
 * - No index register is applied, so no page-cross penalties.
 * - Increments program counter by 2.
 */
describe(absolute.name, () => {
	describe.each`
		programMemory0 | programMemory1 | expectedAddress
		${0x02}        | ${0x01}        | ${0x0102}
	`(
		'when $programMemory0, $programMemory1 is on program memory',
		({ expectedAddress, programMemory0, programMemory1 }) => {
			it(`should return ${expectedAddress} and increase program counter by 2.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory0);
				console.cpu.bus.write(console.cpu.programCounter + 1, programMemory1);

				const previousProgramCounter = console.cpu.programCounter;

				expect(absolute(console.cpu)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 2);
			});
		},
	);
});
