/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import zeroPageY from '../zeroPageY';

/**
 * Addressing semantics: zero page,Y
 * - Adds Y to the base zero-page address modulo 256 (wraparound).
 * - Increments program counter by 1.
 */
describe(zeroPageY.name, () => {
	describe.each`
		programMemory | y       | expectedAddress
		${0x1}        | ${0x1}  | ${0x2}
		${0x1}        | ${0xff} | ${0x0}
	`('when $programMemory is on program memory', ({ expectedAddress, programMemory, y }) => {
		it(`should return ${expectedAddress} and increase program counter by one.`, () => {
			const console = new Machine();
			console.cpu.bus.write(console.cpu.programCounter, programMemory);
			console.cpu.y = y;

			const previousProgramCounter = console.cpu.programCounter;

			expect(zeroPageY(console.cpu)).toBe(expectedAddress);
			expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
		});
	});
});
