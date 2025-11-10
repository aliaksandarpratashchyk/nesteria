/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import accumulator from '../accumulator';

const SOME_BYTE = 0x1;

/**
 * Addressing semantics: accumulator
 * - The accumulator register is the operand target.
 * - No memory read occurs; resolve returns the literal mode string.
 */
describe('accumulator', () => {
	describe('resolve', () => {
		it('should return "absolute".', () => {
			const console = new Machine();

			expect(accumulator.resolve(console.cpu)).toBe('accumulator');
		});
	});
	describe('read', () => {
		it('should return accumulator.', () => {
			const console = new Machine();
			console.cpu.accumulator = SOME_BYTE;

			expect(accumulator.read(console.cpu, accumulator.resolve(console.cpu))).toBe(
				console.cpu.accumulator,
			);
		});
	});
});
