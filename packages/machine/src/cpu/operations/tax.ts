/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Transfer Accumulator into X
 *
 * Transfers the contents of the accumulator into the register X.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function tax(cpu: CPU): void {
	cpu.x = cpu.accumulator;
	cpu.negative = !!(cpu.x & 0x80);
	cpu.zero = !cpu.x;
}

export default tax;
