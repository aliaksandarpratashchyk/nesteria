/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from '../AddressingMode';
import type CPU from '../CPU';

/**
 * Relative addressing mode used by branch instructions.
 * Reads an 8‑bit signed offset, adds it to the current PC to produce
 * the target address; the read value is unused by the operation.
 */
const relative: AddressingMode<number> = {
	read(): number {
		throw new Error('Relative addressing mode do not support read operation.');
	},
	resolve(cpu: CPU): number {
		const offset = cpu.bus.read(cpu.programCounter++);
		const address =
			0xffff &
			(cpu.programCounter +
				// eslint-disable-next-line no-negated-condition
				(!(offset & 0x80) ? offset : 0xff00 | offset));

		return address;
	},
};

export default relative;
