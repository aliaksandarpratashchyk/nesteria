/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';
import type { ACCUMULATOR } from '../OperandAddress';

/**
 * Arithmetic Shift Left
 *
 * Shifts the accumulator or memory left by one bit.
 * Clears bit 0 and moves original bit 7 into carry.
 * Stores the result back into the source (A or memory).
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function asl(cpu: CPU, address: number | typeof ACCUMULATOR, data: number): void {
	cpu.carry = !!(data & 0x80);
	const result = (data << 1) & 0xff;

	if (typeof address === 'number') cpu.bus.write(address, result);
	else cpu.accumulator = result;

	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default asl;
