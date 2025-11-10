/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import zeroPageX from '../zeroPageX';

/**
 * Addressing semantics: zero page,X
 * - Adds X to the base zero-page address modulo 256 (wraparound).
 * - Increments program counter by 1.
 */
describe(zeroPageX.name, () => {
	describe.each`
		programMemory | x       | expectedAddress
		${0x1}        | ${0x1}  | ${0x2}
		${0x1}        | ${0xff} | ${0x0}
	`('when $programMemory is on program memory', ({ expectedAddress, programMemory, x }) => {
		it(`should return ${expectedAddress} and increase program counter by one.`, () => {
			const console = new Machine();
			console.cpu.bus.write(console.cpu.programCounter, programMemory);
			console.cpu.x = x;

			const previousProgramCounter = console.cpu.programCounter;

			expect(zeroPageX(console.cpu)).toBe(expectedAddress);
			expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
		});
	});
});
