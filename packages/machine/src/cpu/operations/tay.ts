/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Transfer Accumulator into Y
 *
 * Transfers the contents of the accumulator into the register Y.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function tay(cpu: CPU): void {
	cpu.y = cpu.accumulator;
	cpu.negative = !!(cpu.y & 0x80);
	cpu.zero = !cpu.y;
}

export default tay;
