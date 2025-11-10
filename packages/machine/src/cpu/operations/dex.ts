/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * DEcrement X
 *
 * X = X - 1
 *
 * Decrements the contents of the register X by one.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function dex(cpu: CPU): void {
	cpu.x = (cpu.x + 0xff) & 0xff;
	cpu.negative = !!(cpu.x & 0x80);
	cpu.zero = !cpu.x;
}

export default dex;
