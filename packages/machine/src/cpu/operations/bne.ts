/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Branch on Not Equal to zero
 *
 * Branches if the zero flag is clear.
 *
 * @remarks
 * Adds one extra cycle if the branch is taken.
 *
 * @remarks
 * Adds one additional cycle if a page boundary is crossed.
 *
 * @param cpu - CPU
 */
function bne(cpu: CPU, address: number): void {
	if (cpu.zero) return;

	cpu.cycles++;

	if ((cpu.programCounter & 0xff00) !== (address & 0xff00)) cpu.cycles++;

	cpu.programCounter = address;
}

export default bne;
