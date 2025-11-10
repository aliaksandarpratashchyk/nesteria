/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import ror from '../ror';

const SOMEWHERE = 0x0001;

/**
 * Operation semantics: ROR (Rotate Right through Carry)
 * - Result = (C_in << 7) | (value >> 1); C_out = old bit0.
 * - Sets N from bit7 of result, Z if result==0.
 * ROR shifts right; bit 0 becomes new carry, previous carry becomes bit 7.
 * Tests cover: simple shift, carry-out from bit 0, and injecting carry into bit 7.
 */
describe(ror.name, () => {
	describe.each`
		carry    | data           | expectedMemory | expectedCarry | expectedNegative | expectedZero
		${false} | ${0b0000_0010} | ${0b0000_0001} | ${false}      | ${false}         | ${false}
		${false} | ${0b0000_0001} | ${0b0000_0000} | ${true}       | ${false}         | ${true}
		${true}  | ${0b0000_0000} | ${0b1000_0000} | ${false}      | ${true}          | ${false}
	`(
		'when the carry is $carry and the data is $data',
		({ carry, data, expectedCarry, expectedMemory, expectedNegative, expectedZero }) => {
			it(
				`should store ${expectedMemory} in the memory, ` +
					`set carry to ${expectedCarry}, negative to false and zero to ${expectedZero}.`,
				() => {
					const console = new Machine();
					console.cpu.carry = carry;

					ror(console.cpu, SOMEWHERE, data);

					expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
					expect(console.cpu.carry).toBe(expectedCarry);
					expect(console.cpu.negative).toBe(expectedNegative);
					expect(console.cpu.zero).toBe(expectedZero);
				},
			);
		},
	);
});
