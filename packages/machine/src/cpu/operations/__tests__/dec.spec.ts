/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import dec from '../dec';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: DEC (Decrement Memory)
 * - Decrements memory at address: M = (M - 1) & 0xFF.
 * - Sets Z if M==0, N from bit7 of M; C and V unaffected.
 */
describe(dec.name, () => {
	describe.each`
		data    | expectedMemory | expectedNegative | expectedZero
		${0x02} | ${0x01}        | ${false}         | ${false}
		${0x01} | ${0x00}        | ${false}         | ${true}
		${0x00} | ${0xff}        | ${true}          | ${false}
		${0xff} | ${0xfe}        | ${true}          | ${false}
	`('when the data is $data', ({ data, expectedMemory, expectedNegative, expectedZero }) => {
		it(
			`should store ${expectedMemory} in the memory, ` +
				`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
			() => {
				const console = new Machine();

				dec(console.cpu, SOMEWHERE, data);

				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
				expect(console.cpu.negative).toBe(expectedNegative);
				expect(console.cpu.zero).toBe(expectedZero);
			},
		);
	});
});
