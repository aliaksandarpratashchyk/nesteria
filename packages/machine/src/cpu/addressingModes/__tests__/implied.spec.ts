/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import implied from '../implied';

/**
 * Addressing semantics: implied
 * - No operand is fetched; the instruction implicitly uses registers or flags.
 * - Program counter does not advance for an operand byte.
 */
describe('implied', () => {
	describe('resolve', () => {
		it('should return "implied".', () => {
			const console = new Machine();

			expect(implied.resolve(console.cpu)).toBe('implied');
		});
	});
	describe('read', () => {
		it('should throw an error.', () => {
			const console = new Machine();

			expect(() =>
				implied.read(console.cpu, implied.resolve(console.cpu)),
			).toThrowErrorMatchingInlineSnapshot(
				`"Implied addressing mode do not support read operation."`,
			);
		});
	});
});
