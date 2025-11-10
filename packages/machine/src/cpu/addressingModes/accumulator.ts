/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from '../AddressingMode';
import type CPU from '../CPU';

import { ACCUMULATOR } from '../OperandAddress';

/**
 * Accumulator addressing mode.
 * Uses the A register as the implicit operand source/target.
 */
const accumulator: AddressingMode<typeof ACCUMULATOR> = {
	read(cpu: CPU): number {
		return cpu.accumulator;
	},
	resolve(): typeof ACCUMULATOR {
		return ACCUMULATOR;
	},
};

export default accumulator;
