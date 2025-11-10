/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import rra from '../rra';

const SOMEWHERE = 0x0080;

/**
 * RRA is an unofficial opcode: it performs ROR on memory, then ADC with that value.
 * Case 2 shows: ROR(0x02) with C=true -> writes 0x81, sets C=false;
 * then ADC(A=0x7F, data=0x81, C=false) -> A=0x00, C=true, Z=true, N=false.
 */
describe(rra.name, () => {
	describe.each`
		carry    | data    | accumulator | expectedCPU                                                          | expectedMemory
		${false} | ${0x01} | ${0x00}     | ${{ accumulator: 0x01, carry: false, negative: false, zero: false }} | ${0x00}
		${true}  | ${0x02} | ${0x7f}     | ${{ accumulator: 0x00, carry: true, negative: false, zero: true }}   | ${0x81}
	`(
		'when C=$carry, data=$data and accumulator=$accumulator',
		({ accumulator, carry, data, expectedCPU, expectedMemory }) => {
			it(`should set the CPU to ${JSON.stringify(expectedCPU)} and write ${expectedMemory} to memory`, () => {
				const console = new Machine();
				console.cpu.carry = carry;
				console.cpu.accumulator = accumulator;

				rra(console.cpu, SOMEWHERE, data);

				expect(console.cpu).toMatchObject(expectedCPU);
				expect(console.cpu.bus.read(SOMEWHERE)).toBe(expectedMemory);
			});
		},
	);
});
