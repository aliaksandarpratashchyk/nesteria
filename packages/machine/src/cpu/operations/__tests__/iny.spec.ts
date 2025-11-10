/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import iny from '../iny';

/**
 * Operation semantics: INY (Increment Y)
 * - Y = (Y + 1) & 0xFF.
 * - Sets Z if Y==0, N from bit7 of Y; other flags unaffected.
 */
describe(iny.name, () => {
	describe.each`
		y       | expectedY | expectedNegative | expectedZero
		${0xfe} | ${0xff}   | ${true}          | ${false}
		${0xff} | ${0x00}   | ${false}         | ${true}
		${0x00} | ${0x01}   | ${false}         | ${false}
		${0x01} | ${0x02}   | ${false}         | ${false}
	`('when the register Y is $y', ({ expectedNegative, expectedY, expectedZero, y }) => {
		it(
			`should store ${expectedY} in the register Y, ` +
				`set the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
			() => {
				const nes = new Machine();
				nes.cpu.y = y;

				iny(nes.cpu);

				expect(nes.cpu.y).toBe(expectedY);
				expect(nes.cpu.negative).toBe(expectedNegative);
				expect(nes.cpu.zero).toBe(expectedZero);
			},
		);
	});
});
