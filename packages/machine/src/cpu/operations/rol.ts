/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';
import type { ACCUMULATOR } from '../OperandAddress';

/**
 * Rotate Left one bit
 *
 * Rotates the contents of the specified address (memory or accumulator) by one bit left.
 * The carry goes into bit 0. Bit 7 goes into the carry.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function rol(cpu: CPU, address: number | typeof ACCUMULATOR, data: number): void {
	const { carry } = cpu;
	cpu.carry = !!(data & 0x80);
	const result = ((data << 1) & 0xff) | +carry;

	if (typeof address === 'number') cpu.bus.write(address, result);
	else cpu.accumulator = result;

	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default rol;
