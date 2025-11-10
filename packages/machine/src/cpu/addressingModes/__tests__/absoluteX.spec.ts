/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import absoluteX from '../absoluteX';

/**
 * Absolute,X forms a 16-bit base address from the next two bytes, then adds X.
 * With extraCycles=true, add +1 cycle if adding X crosses a page.
 */
describe(absoluteX.name, () => {
	describe.each`
		programMemory0 | programMemory1 | x    | expectedAddress | expectedCycles
    // No page cross: 0x0102 + X=1 -> 0x0103 (0 extra cycles)
		${0x2}         | ${0x1}         | ${1} | ${0x103}        | ${0}
		${0xff}        | ${0x1}         | ${1} | ${0x200}        | ${1}
	`(
		'when $programMemory0, $programMemory1 is on program memory',
		({ expectedAddress, expectedCycles, programMemory0, programMemory1, x }) => {
			it(`should return ${expectedAddress}, increase program counter by 2 and cpu cycles by ${expectedCycles}.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory0);
				console.cpu.bus.write(console.cpu.programCounter + 1, programMemory1);
				console.cpu.x = x;

				const previousProgramCounter = console.cpu.programCounter;
				const previousCycles = console.cpu.cycles;

				// Pass extraCycles=true to test page-crossing penalty behavior
				expect(absoluteX(console.cpu, 1)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 2);
				expect(console.cpu.cycles).toBe(previousCycles + expectedCycles);
			});
		},
	);
});
