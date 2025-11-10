/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * STore Accumulator in memory
 *
 * M = A
 *
 * Copies the contents of the accumulator to the specified memory location.
 *
 * @param cpu - CPU
 */
function sta(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.accumulator);
}

export default sta;
