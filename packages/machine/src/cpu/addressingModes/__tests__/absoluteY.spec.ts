/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import absoluteY from '../absoluteY';

/**
 * Absolute,Y forms a 16-bit base address from the next two bytes, then adds Y.
 * When extraCycles=true, crossing a page boundary (+Y changes high byte) incurs +1 cycle.
 */
describe(absoluteY.name, () => {
	describe.each`
		programMemory0 | programMemory1 | y    | expectedAddress | expectedCycles
        // Case 1: no page crossing (0x0102 + Y=1 -> 0x0103), expectedCycles=0
		${0x2}         | ${0x1}         | ${1} | ${0x103}        | ${0}
		${0xff}        | ${0x1}         | ${1} | ${0x200}        | ${1}
	`(
		'when $programMemory0, $programMemory1 is on program memory',
		({ expectedAddress, expectedCycles, programMemory0, programMemory1, y }) => {
			it(`should return ${expectedAddress}, increase program counter by 2 and cpu cycles by ${expectedCycles}.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory0);
				console.cpu.bus.write(console.cpu.programCounter + 1, programMemory1);
				console.cpu.y = y;

				const previousProgramCounter = console.cpu.programCounter;
				const previousCycles = console.cpu.cycles;

				// Pass extraCycles=true to test page-crossing penalty behavior
				expect(absoluteY(console.cpu, 1)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 2);
				expect(console.cpu.cycles).toBe(previousCycles + expectedCycles);
			});
		},
	);
});
