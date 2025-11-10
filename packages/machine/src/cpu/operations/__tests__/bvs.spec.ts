/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bvs from '../bvs';

/**
 * Operation semantics: BVS (Branch if Overflow Set)
 * - Branches to relative address if V flag is set.
 * - Adds +1 cycle if branch taken, +2 if taken and page crossed.
 */
describe(bvs.name, () => {
	describe.each`
		overflow | programCounter | address   | expectedProgramCounter | expectedExtraCycles
		${false} | ${0x0011}      | ${0x0011} | ${0x0011}              | ${0}
		${true}  | ${0x0011}      | ${0x0013} | ${0x0013}              | ${1}
		${true}  | ${0x0011}      | ${0x013f} | ${0x013f}              | ${2}
	`(
		'when the overflow is $overflow, ' +
			'the program counter is $programCounter and the address is $address',
		({ address, expectedExtraCycles, expectedProgramCounter, overflow, programCounter }) => {
			it(
				`set the program counter to ${expectedProgramCounter} ` +
					`and increase cycles on ${expectedExtraCycles}.`,
				() => {
					const console = new Machine();
					console.cpu.overflow = overflow;
					console.cpu.programCounter = programCounter;

					bvs(console.cpu, address);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
					expect(console.cpu.cycles).toBe(expectedExtraCycles);
				},
			);
		},
	);
});
