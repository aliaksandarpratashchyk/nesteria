/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Store X in memory
 *
 * Copies the contents of the register X to the specified memory location.
 *
 * @param cpu - CPU
 */
function stx(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.x);
}

export default stx;
