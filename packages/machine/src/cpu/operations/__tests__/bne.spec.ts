/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bne from '../bne';

/**
 * Operation semantics: BNE (Branch if Not Equal)
 * - Branches to relative address if Z flag is clear.
 * - Adds +1 cycle if branch taken, +2 if taken and page crossed.
 */
describe(bne.name, () => {
	describe.each`
		zero     | programCounter | address   | expectedProgramCounter | expectedExtraCycles
		${true}  | ${0x0011}      | ${0x0011} | ${0x0011}              | ${0}
		${false} | ${0x0011}      | ${0x0013} | ${0x0013}              | ${1}
		${false} | ${0x0011}      | ${0x013f} | ${0x013f}              | ${2}
	`(
		'when the zero is $zero, the program counter is $programCounter and address is $address',
		({ address, expectedExtraCycles, expectedProgramCounter, programCounter, zero }) => {
			it(
				`set the program counter to ${expectedProgramCounter} ` +
					`and increase cycles on ${expectedExtraCycles}.`,
				() => {
					const console = new Machine();
					console.cpu.zero = zero;
					console.cpu.programCounter = programCounter;

					bne(console.cpu, address);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
					expect(console.cpu.cycles).toBe(expectedExtraCycles);
				},
			);
		},
	);
});
