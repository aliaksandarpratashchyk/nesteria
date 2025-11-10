/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import anc from '../anc';

/**
 * Operation semantics: ANC (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(anc.name, () => {
	describe.each`
		accumulator | data    | expectedCPU
		${0xff}     | ${0x80} | ${{ accumulator: 0x80, carry: false, negative: true, zero: false }}
		${0xff}     | ${0x40} | ${{ accumulator: 0x40, carry: true, negative: false, zero: false }}
		${0x00}     | ${0xff} | ${{ accumulator: 0x00, carry: false, negative: false, zero: true }}
	`('when A=$accumulator and data=$data', ({ accumulator, data, expectedCPU }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}`, () => {
			const console = new Machine();
			console.cpu.accumulator = accumulator;

			anc(console.cpu, data);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
