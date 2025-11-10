/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * INCrement memory
 *
 * M = M + 1
 *
 * Increments the contents of the specified memory address by one, then stores the result
 * back into the specified memory address.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function inc(cpu: CPU, address: number, data: number): void {
	const result = (data + 0x01) & 0xff;

	cpu.bus.write(address, result);

	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default inc;
