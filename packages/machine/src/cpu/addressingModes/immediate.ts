/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from '../AddressingMode';
import type CPU from '../CPU';

import { IMMEDIATE } from '../OperandAddress';

/**
 * Immediate addressing mode.
 * Treats the next byte at the program counter as the operand value.
 */
const immediate: AddressingMode<typeof IMMEDIATE> = {
	read(cpu: CPU): number {
		return cpu.bus.read(cpu.programCounter++);
	},
	resolve(): typeof IMMEDIATE {
		return IMMEDIATE;
	},
};

export default immediate;
