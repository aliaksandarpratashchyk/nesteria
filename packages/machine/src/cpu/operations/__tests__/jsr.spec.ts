/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import jsr from '../jsr';

/**
 * Operation semantics: JSR (Jump to Subroutine)
 * - Pushes (PC-1) to stack (high, then low) and sets PC to target address.
 */
describe(jsr.name, () => {
	describe.each`
		programCounter | address   | expectedStack0 | expectedStack1 | expectedProgramCounter
		${0x0102}      | ${0x0001} | ${0x01}        | ${0x01}        | ${0x0001}
	`(
		'when the program counter is $programCounter and the address is $address',
		({ address, expectedProgramCounter, expectedStack0, expectedStack1, programCounter }) => {
			it(
				`should put ${expectedStack0}, ${expectedStack1} on the stack ` +
					`and point the program counter to ${expectedProgramCounter}.`,
				() => {
					const console = new Machine();
					console.cpu.programCounter = programCounter;

					jsr(console.cpu, address);

					console.cpu.stackPointer++;
					expect(console.cpu.stackTop).toBe(expectedStack0);

					console.cpu.stackPointer++;
					expect(console.cpu.stackTop).toBe(expectedStack1);

					expect(console.cpu.programCounter).toBe(expectedProgramCounter);
				},
			);
		},
	);
});
