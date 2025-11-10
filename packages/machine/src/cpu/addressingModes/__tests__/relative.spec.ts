/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import relative from '../relative';

/**
 * Addressing semantics: relative
 * - Reads a signed 8-bit offset from the next byte.
 * - Computes target as (PC + 2) + sign-extended offset; branches may add cycles on page-crossing.
 */
describe('relative', () => {
	describe('resolve', () => {
		describe.each`
			programCounter | programMemory | expectedAddress
			${0x400}       | ${0x7f}       | ${0x401}
			${0x400}       | ${0x80}       | ${0x401}
		`(
			'when program counter is at $programCounter and $programMemory is on program memory',
			({ expectedAddress, programCounter, programMemory }) => {
				it(`should return ${expectedAddress}.`, () => {
					const console = new Machine();
					console.cpu.programCounter = programCounter;
					console.cpu.bus.write(programCounter + 1, programMemory);

					expect(relative.resolve(console.cpu)).toBe(expectedAddress);
				});
			},
		);
	});
	describe('read', () => {
		it('should throw an error.', () => {
			const console = new Machine();

			expect(() =>
				relative.read(console.cpu, relative.resolve(console.cpu)),
			).toThrowErrorMatchingInlineSnapshot(
				`"Relative addressing mode do not support read operation."`,
			);
		});
	});
});
