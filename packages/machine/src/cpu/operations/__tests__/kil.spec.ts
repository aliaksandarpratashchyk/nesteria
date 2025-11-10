/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import kil from '../../operations/kil';

/**
 * Operation semantics: KIL (Jam/Halt, Unofficial)
 * - Halts the CPU; on this emulator implemented as throwing an error when executed.
 */
describe(kil.name, () => {
	describe.each`
		_    | expected
		${0} | ${'error'}
	`('when executed', () => {
		it('should throw', () => {
			expect(() => {
				kil();
			}).toThrow();
		});
	});
});
