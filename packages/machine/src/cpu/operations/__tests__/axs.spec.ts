/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import axs from '../axs';

/**
 * Operation semantics: AXS (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(axs.name, () => {
	describe.each`
		accumulator | x       | data    | expectedCPU
		${0x0f}     | ${0x0f} | ${0x01} | ${{ carry: true, negative: false, x: 0x0e, zero: false }}
		${0x00}     | ${0x00} | ${0x01} | ${{ carry: false, negative: true, x: 0xff, zero: false }}
	`('when A=$accumulator, X=$x and data=$data', ({ accumulator, data, expectedCPU, x }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();
			console.cpu.accumulator = accumulator;
			console.cpu.x = x;

			axs(console.cpu, data);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
