/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import indirect from '../indirect';

/**
 * Addressing semantics: JMP (indirect)
 * - Reads a 16-bit pointer from the next two bytes (low, then high), forming PTRL.
 * - Fetches the target address from memory at [PTRL] and [PTRL+1].
 * - 6502 quirk: if PTRL crosses a page boundary (low byte=$FF), the high byte wraps
 *   within the same page (i.e., read from (PTRL & 0xFF00) | 0x00).
 * - Increments program counter by 2.
 */
describe(indirect.name, () => {
	describe.each`
		programMemory | zeroPage0 | zeroPage1 | expectedAddress
		${0x1}        | ${0x2}    | ${0x1}    | ${0}
	`(
		'when $programMemory is on program memory and $zezoPage0, $zeroPage1 is on zero page',
		({ expectedAddress, programMemory, zeroPage0, zeroPage1 }) => {
			it(`should return ${expectedAddress} and increate program counter by 2.`, () => {
				const console = new Machine();
				console.cpu.bus.write(console.cpu.programCounter, programMemory);
				console.cpu.bus.write(programMemory, zeroPage0);
				console.cpu.bus.write(programMemory + 1, zeroPage1);

				const previousProgramCounter = console.cpu.programCounter;

				expect(indirect(console.cpu)).toBe(expectedAddress);
				expect(console.cpu.programCounter).toBe(previousProgramCounter + 2);
			});
		},
	);
});
