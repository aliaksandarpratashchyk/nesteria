/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bcs from '../bcs';

/**
 * Operation semantics: BCS (Branch if Carry Set)
 * - Branches to relative address if C flag is set.
 * - Adds +1 cycle if branch taken, +2 if taken and page crossed.
 */
describe(bcs.name, () => {
	describe.each`
		carry    | programCounter | address   | expectedProgramCounter | expectedExtraCycles
		${false} | ${0x0011}      | ${0x0011} | ${0x0011}              | ${0}
		${true}  | ${0x0011}      | ${0x0013} | ${0x0013}              | ${1}
		${true}  | ${0x0011}      | ${0x013f} | ${0x013f}              | ${2}
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

					bcs(console.cpu, address);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
					expect(console.cpu.cycles).toBe(expectedExtraCycles);
				},
			);
		},
	);
});
