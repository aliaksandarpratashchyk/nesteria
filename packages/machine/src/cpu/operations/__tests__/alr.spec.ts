/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import alr from '../alr';

/**
 * Operation semantics: ALR (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(alr.name, () => {
	describe.each`
		accumulator    | data    | expectedAccumulator | expectedCarry | expectedZero
		${0b0000_0110} | ${0xff} | ${0b0000_0011}      | ${false}      | ${false}
	`(
		'when the accumulator is $accumulator and the data is $data',
		({ accumulator, data, expectedAccumulator, expectedCarry, expectedNegative, expectedZero }) => {
			it(
				`should set the accumulator to ${accumulator}, ` +
					`the carry to ${expectedCarry}, ` +
					`the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;

					alr(console.cpu, data);

					expect(console.cpu.accumulator).toBe(expectedAccumulator);
					expect(console.cpu.carry).toBe(expectedCarry);
					expect(console.cpu.negative).toBeFalsy();
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
