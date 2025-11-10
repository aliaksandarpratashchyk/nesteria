/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';
import type { ACCUMULATOR } from '../OperandAddress';

/**
 * Logical Shift Right
 *
 * Shifts the specified contents (memory or accumulator) right by one bit.
 * Transfers bit 0 into carry.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function lsr(cpu: CPU, address: number | typeof ACCUMULATOR, data: number): void {
	cpu.carry = !!(data & 0b00000001);
	const result = (data >> 1) & 0b01111111;

	if (typeof address === 'number') cpu.bus.write(address, result);
	else cpu.accumulator = result;

	cpu.negative = false;
	cpu.zero = !result;
}

export default lsr;
