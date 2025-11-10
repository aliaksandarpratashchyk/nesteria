/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import nop from '../nop';

/**
 * Operation semantics: NOP (No Operation)
 * - Performs no operation and does not modify flags.
 */
describe(nop.name, () => {
	it('should do nothing.', () => {
		nop();
	});
});
