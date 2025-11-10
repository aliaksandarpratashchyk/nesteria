/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Jump to address
 *
 * PC = ADDRESS
 *
 * Loads the specified address into the program counter.
 *
 * @param cpu - CPU
 */
function jmp(cpu: CPU, address: number): void {
	cpu.programCounter = address;
}

export default jmp;
