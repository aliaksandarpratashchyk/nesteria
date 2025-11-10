/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Store X AND high byte of address
 *
 * M = X & (high_byte(ADDRESS) + 1)
 *
 * Unofficial opcode that stores in memory the result of a bitwise AND
 * between the X register and (high byte of the address + 1).
 *
 * @param cpu - CPU
 */
function shx(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.x & ((address >> 8) + 1));
}

export default shx;
