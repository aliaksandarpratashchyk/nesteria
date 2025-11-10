/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Transfer A AND X to stack, then store stack AND (high byte of address + 1)
 *
 * SP = A & X;
 * M = SP & (high_byte(address) + 1)
 *
 * Unofficial opcode that stores into the stack pointer (A AND X), then stores
 * in memory (SP AND (high byte of address + 1)).
 *
 * @param cpu - CPU
 */
function tas(cpu: CPU, address: number): void {
	cpu.stackPointer = cpu.accumulator & cpu.x;
	cpu.bus.write(address, cpu.stackPointer & ((address >> 8) + 1));
}

export default tas;
