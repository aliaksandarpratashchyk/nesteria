/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import las from '../las';

/**
 * Operation semantics: LAS (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(las.name, () => {
	describe.each`
		stackPointer | data    | expectedCPU
		${0xf0}      | ${0x0f} | ${{ accumulator: 0x00, negative: false, stackPointer: 0x00, x: 0x00, zero: true }}
		${0xff}      | ${0x80} | ${{ accumulator: 0x80, negative: true, stackPointer: 0x80, x: 0x80, zero: false }}
	`('when S=$stackPointer and data=$data', ({ data, expectedCPU, stackPointer }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}`, () => {
			const console = new Machine();
			console.cpu.stackPointer = stackPointer;

			las(console.cpu, data);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
