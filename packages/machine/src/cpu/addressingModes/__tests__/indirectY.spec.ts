/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import indirectY from '../indirectY';

/**
 * Addressing semantics: (indirect),Y
 * - Reads an 8-bit zero-page pointer from the next byte.
 * - Loads a 16-bit base address from zero page at [ptr] and [ptr+1] (wraps in zero page).
 * - Adds Y to the base address; some operations incur +1 cycle on page-crossing.
 * - Increments program counter by 1.
 */
describe(indirectY.name, () => {
	describe.each`
		programMemory | zeroPage0 | zeroPage1 | y    | expectedAddress
		${0x1}        | ${0x2}    | ${0x1}    | ${1} | ${0x103}
	`(
		'when $programMemory is on program memory and $zezoPage0, $zeroPage1 is on zero page',
		({ expectedAddress, programMemory, y, zeroPage0, zeroPage1 }) => {
			it(`should return ${expectedAddress} and increate program counter by 1.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory);
				console.cpu.bus.write(programMemory, zeroPage0);
				console.cpu.bus.write(programMemory + 1, zeroPage1);
				console.cpu.y = y;

				const previousProgramCounter = console.cpu.programCounter;

				expect(indirectY(console.cpu)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
			});
		},
	);
});
