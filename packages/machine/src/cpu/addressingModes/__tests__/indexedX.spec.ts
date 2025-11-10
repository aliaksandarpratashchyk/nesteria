/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import indexedX from '../indexedX';

/**
 * Addressing semantics: (indirect,X)
 * - Reads an 8-bit zero-page base from the next byte, adds X modulo 256.
 * - Loads a 16-bit effective address from zero page at [base+X] and [base+X+1] (wraparound).
 * - Increments program counter by 1.
 */
describe(indexedX.name, () => {
	describe.each`
		programMemory | zeroPage0 | zeroPage1 | x    | expectedAddress
		${0x1}        | ${0x2}    | ${0x1}    | ${1} | ${0x102}
	`(
		'when $programMemory is on program memory and $zezoPage0, $zeroPage1 is on zero page',
		({ expectedAddress, programMemory, x, zeroPage0, zeroPage1 }) => {
			it(`should return ${expectedAddress} and increate program counter by 1.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory);
				console.cpu.bus.write(programMemory + x, zeroPage0);
				console.cpu.bus.write(programMemory + 1 + x, zeroPage1);
				console.cpu.x = x;

				const previousProgramCounter = console.cpu.programCounter;

				expect(indexedX(console.cpu)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
			});
		},
	);
});
