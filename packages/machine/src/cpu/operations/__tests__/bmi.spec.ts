/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import bmi from '../bmi';

/**
 * Operation semantics: BMI (Branch if Minus)
 * - Branches to relative address if N flag is set.
 * - Adds +1 cycle if branch taken, +2 if taken and page crossed.
 */
describe(bmi.name, () => {
	describe.each`
		negative | programCounter | address   | expectedProgramCounter | expectedExtraCycles
		${false} | ${0x0011}      | ${0x0011} | ${0x0011}              | ${0}
		${true}  | ${0x0011}      | ${0x0013} | ${0x0013}              | ${1}
		${true}  | ${0x0011}      | ${0x013f} | ${0x013f}              | ${2}
	`(
		'when the negative is $negative, ' +
			'the program counter is $programCounter and the address is $address',
		({ address, expectedExtraCycles, expectedProgramCounter, negative, programCounter }) => {
			it(
				`set the program counter to ${expectedProgramCounter} ` +
					`and increase cycles on ${expectedExtraCycles}.`,
				() => {
					const console = new Machine();
					console.cpu.negative = negative;
					console.cpu.programCounter = programCounter;

					bmi(console.cpu, address);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
					expect(console.cpu.cycles).toBe(expectedExtraCycles);
				},
			);
		},
	);
});
