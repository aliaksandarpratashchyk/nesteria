/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import zeroPage from '../zeroPage';

/**
 * Addressing semantics: zero page
 * - Uses the next byte as a zero-page address ($00-$FF).
 * - Increments program counter by 1.
 */
describe(zeroPage.name, () => {
	describe.each`
		programMemory | expectedAddress
		${0x1}        | ${0x1}
	`('when $programMemory is on program memory', ({ expectedAddress, programMemory }) => {
		it(`should return ${expectedAddress} and increase program counter by one.`, () => {
			const console = new Machine();
			console.cpu.bus.write(console.cpu.programCounter, programMemory);

			const previousProgramCounter = console.cpu.programCounter;

			expect(zeroPage(console.cpu)).toBe(expectedAddress);
			expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
		});
	});
});
