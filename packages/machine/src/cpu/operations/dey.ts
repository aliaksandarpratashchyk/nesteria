/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * DEcrement Y
 *
 * Y = Y - 1
 *
 * Decrements the contents of the register Y by one.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function dey(cpu: CPU): void {
	cpu.y = (cpu.y + 0xff) & 0xff;
	cpu.negative = !!(cpu.y & 0x80);
	cpu.zero = !cpu.y;
}

export default dey;
