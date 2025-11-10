/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import txs from '../txs';

/**
 * Operation semantics: TXS (Transfer X to Stack Pointer)
 * - SP = X.
 * - Does not modify flags.
 */
describe(txs.name, () => {
	describe.each`
		x       | expectedStackPointer
		${0xff} | ${0xff}
		${0x00} | ${0x00}
		${0x01} | ${0x01}
	`('when x is $x', ({ expectedStackPointer, x }) => {
		it(
			`should put ${expectedStackPointer} into the stack pointer ` +
				`and do not affect the negative and zero flags.`,
			() => {
				const console = new Machine();
				console.cpu.x = x;

				txs(console.cpu);

				expect(console.cpu.stackPointer).toBe(expectedStackPointer);
				expect(console.cpu.negative).toBeFalsy();
				expect(console.cpu.zero).toBeFalsy();
			},
		);
	});
});
