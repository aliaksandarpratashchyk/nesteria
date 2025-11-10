/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import xaa from '../xaa';

/**
 * Operation semantics: XAA (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(xaa.name, () => {
	describe.each`
		accumulator | x       | data    | expectedCPU
		${0xff}     | ${0x0f} | ${0x0f} | ${{ accumulator: 0x0f }}
		${0x0f}     | ${0xff} | ${0x0f} | ${{ accumulator: 0x0f }}
		${0x0f}     | ${0x0f} | ${0x00} | ${{ accumulator: 0x00 }}
	`(
		'when accumulator=$accumulator, X=$x and data=$data',
		({ accumulator, data, expectedCPU, x }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;
				console.cpu.x = x;

				xaa(console.cpu, data);

				expect(console.cpu).toMatchObject(expectedCPU);
			});
		},
	);
});
