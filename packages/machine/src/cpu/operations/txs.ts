/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Transfer X into S
 *
 * Transfers the contents of the register X into the stack pointer.
 *
 * @remarks
 * Does not affect any flags.
 *
 * @param cpu - CPU
 */
function txs(cpu: CPU): void {
	cpu.stackPointer = cpu.x;
}

export default txs;
