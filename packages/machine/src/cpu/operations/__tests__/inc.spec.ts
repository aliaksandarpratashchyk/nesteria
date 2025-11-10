/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import inc from '../inc';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: INC (Increment Memory)
 * - Increments memory at address: M = (M + 1) & 0xFF.
 * - Sets Z if M==0, N from bit7 of M; C and V unaffected.
 */
describe(inc.name, () => {
	describe.each`
		data    | expectedMemory | expectedCPU
		${0xfe} | ${0xff}        | ${{ negative: true, zero: false }}
		${0xff} | ${0x00}        | ${{ negative: false, zero: true }}
		${0x00} | ${0x01}        | ${{ negative: false, zero: false }}
		${0x01} | ${0x02}        | ${{ negative: false, zero: false }}
	`('when the data is $data', ({ data, expectedCPU, expectedMemory }) => {
		it(`should store ${expectedMemory} in memory and set the CPU to ${JSON.stringify(expectedCPU)}.`, () => {
			const console = new Machine();

			inc(console.cpu, SOMEWHERE, data);

			expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			expect(console.cpu).toMatchObject(expectedCPU);
		});
	});
});
