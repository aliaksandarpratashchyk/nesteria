/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Transfer Y into Accumulator
 *
 * Transfers the contents of the register Y into the accumulator.
 *
 * @remarks
 * Affects the negative and zero flags.
 *
 * @param cpu - CPU
 */
function tya(cpu: CPU): void {
	cpu.accumulator = cpu.y;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default tya;
