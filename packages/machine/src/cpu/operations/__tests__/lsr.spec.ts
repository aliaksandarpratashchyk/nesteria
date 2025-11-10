/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import lsr from '../lsr';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: LSR (Logical Shift Right)
 * - Shifts data right by 1; bit0 -> C, bit7 becomes 0.
 * - Sets N from bit7 of result (always 0), Z if result==0.
 */
describe(lsr.name, () => {
	describe.each`
		data           | expectedMemory | expectedCPU
		${0b0000_0110} | ${0b0000_0011} | ${{ carry: false, negative: false, zero: false }}
		${0b0000_0011} | ${0b0000_0001} | ${{ carry: true, negative: false, zero: false }}
		${0b0000_0001} | ${0b0000_0000} | ${{ carry: true, negative: false, zero: true }}
		${0b0000_0000} | ${0b0000_0000} | ${{ carry: false, negative: false, zero: true }}
	`('when the data is $data', ({ data, expectedCPU, expectedMemory }) => {
		it(`should store ${expectedMemory} in memory and set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();
			console.cpu.negative = true;

			lsr(console.cpu, SOMEWHERE, data);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
