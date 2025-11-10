/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bcc from '../bcc';

/**
 * Operation semantics: BCC (Branch if Carry Clear)
 * - Branches to relative address if C flag is clear.
 * - Adds +1 cycle if branch taken, +2 if taken and page crossed.
 */
describe(bcc.name, () => {
	describe.each`
		carry    | programCounter | address   | expectedProgramCounter | expectedExtraCycles
		${true}  | ${0x0011}      | ${0x0011} | ${0x0011}              | ${0}
		${false} | ${0x0011}      | ${0x0013} | ${0x0013}              | ${1}
		${false} | ${0x0011}      | ${0x013f} | ${0x013f}              | ${2}
	`(
		'when the carry is $carry, the program counter is $programCounter and the address is $address',
		({ address, carry, expectedExtraCycles, expectedProgramCounter, programCounter }) => {
			it(
				`set the program counter to ${expectedProgramCounter} ` +
					`and increase cycles on ${expectedExtraCycles}.`,
				() => {
					const console = new Machine();
					console.cpu.carry = carry;
					console.cpu.programCounter = programCounter;

					bcc(console.cpu, address);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
					expect(console.cpu.cycles).toBe(expectedExtraCycles);
				},
			);
		},
	);
});
