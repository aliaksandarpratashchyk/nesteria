/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import lax from '../lax';

/**
 * Operation semantics: LAX (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(lax.name, () => {
	describe.each`
		data    | expectedCPU
		${0x00} | ${{ accumulator: 0x00, negative: false, x: 0x00, zero: true }}
		${0x80} | ${{ accumulator: 0x80, negative: true, x: 0x80, zero: false }}
		${0x01} | ${{ accumulator: 0x01, negative: false, x: 0x01, zero: false }}
	`('when data=$data', ({ data, expectedCPU }) => {
		it(`should set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();

			lax(console.cpu, data);

			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
