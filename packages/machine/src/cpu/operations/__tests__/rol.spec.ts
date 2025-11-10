/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import rol from '../rol';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: ROL (Rotate Left through Carry)
 * - Result = (value << 1) | C_in; C_out = old bit7.
 * - Sets N from bit7 of result, Z if result==0.
 */
describe(rol.name, () => {
	describe.each`
		value          | carryIn  | expectedMemory | expectedCarry | expectedNegative | expectedZero
		${0b0010_0000} | ${false} | ${0b0100_0000} | ${false}      | ${false}         | ${false}
		${0b0100_0000} | ${false} | ${0b1000_0000} | ${false}      | ${true}          | ${false}
		${0b1000_0000} | ${false} | ${0b0000_0000} | ${true}       | ${false}         | ${true}
		${0b0000_0000} | ${true}  | ${0b0000_0001} | ${false}      | ${false}         | ${false}
	`(
		'when the value is $value and the carry is $carryIn',
		({ carryIn, expectedCarry, expectedMemory, expectedNegative, expectedZero, value }) => {
			it(
				`should store ${expectedMemory} in the memory, ` +
					`set the carry to ${expectedCarry}, the negative to ${expectedNegative} and the zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.carry = carryIn;

					rol(console.cpu, SOMEWHERE, value);

					expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
					expect(console.cpu.carry).toBe(expectedCarry);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
