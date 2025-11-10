/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import dey from '../dey';

/**
 * Operation semantics: DEY (Decrement Y)
 * - Y = (Y - 1) & 0xFF.
 * - Sets Z if Y==0, N from bit7 of Y; other flags unaffected.
 */
describe(dey.name, () => {
	describe.each`
		y       | expectedY | expectedNegative | expectedZero
		${0x02} | ${0x01}   | ${false}         | ${false}
		${0x01} | ${0x00}   | ${false}         | ${true}
		${0x00} | ${0xff}   | ${true}          | ${false}
		${0xff} | ${0xfe}   | ${true}          | ${false}
	`('when the register Y is $y', ({ expectedNegative, expectedY, expectedZero, y }) => {
		it(
			`should store ${expectedY} in the register Y, ` +
				`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
			() => {
				const console = new Machine();
				console.cpu.y = y;

				dey(console.cpu);

				expect(console.cpu.y).toBe(expectedY);
				expect(console.cpu.negative).toBe(expectedNegative);
				expect(console.cpu.zero).toBe(expectedZero);
			},
		);
	});
});
