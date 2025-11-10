/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from '../AddressingMode';

import { IMPLIED } from '../OperandAddress';

/**
 * Implied addressing mode.
 * Instruction does not use an explicit operand; value is unused.
 */
const implied: AddressingMode<typeof IMPLIED> = {
	read(): number {
		throw new Error('Implied addressing mode do not support read operation.');
	},
	resolve(): typeof IMPLIED {
		return IMPLIED;
	},
};

export default implied;
