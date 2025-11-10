/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Store Accumulator AND X AND (high byte of address + 1)
 *
 * M = A & X & (high_byte(ADDRESS) + 1)
 *
 * Unofficial opcode that performs a bitwise AND on the accumulator,
 * the X register, and (high byte of the address + 1), then stores
 * the result in memory.
 *
 * @param cpu - CPU
 */
function ahx(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.accumulator & cpu.x & ((address >> 8) + 1));
}

export default ahx;
