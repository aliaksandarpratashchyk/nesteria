/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Store Y AND high byte of address
 *
 * M = Y & (high_byte(ADDRESS) + 1)
 *
 * Unofficial opcode that stores in memory the result of a bitwise AND
 * between the Y register and (high byte of the address + 1).
 *
 * @param cpu - CPU
 */
function shy(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.y & ((address >> 8) + 1));
}

export default shy;
