/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Branch if EQual to zero
 *
 * Points the program counter to a new location if zero flag is set.
 *
 * @remarks
 * Adds 1 extra cycle if branch succeeds.
 *
 * @remarks
 * Adds another 1 extra cycle if page boundary crossed.
 *
 * @param cpu - CPU
 */
function beq(cpu: CPU, address: number): void {
	if (!cpu.zero) return;

	cpu.cycles++;

	if ((cpu.programCounter & 0xff00) !== (address & 0xff00)) cpu.cycles++;

	cpu.programCounter = address;
}

export default beq;
