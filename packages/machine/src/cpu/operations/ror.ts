/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';
import type { ACCUMULATOR } from '../OperandAddress';

/**
 * Rotate Right one bit
 *
 * Rotates the contents of the specified address (memory or accumulator) by one bit right.
 * The carry goes into bit 7. Bit 0 goes into the carry.
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu - CPU
 */
function ror(cpu: CPU, address: number | typeof ACCUMULATOR, data: number): void {
	const { carry } = cpu;
	cpu.carry = !!(data & 0x01);
	const result = ((data >> 1) & 0x7f) | (+carry << 7);

	if (typeof address === 'number') cpu.bus.write(address, result);
	else cpu.accumulator = result;

	cpu.negative = !!(result & 0x80);
	cpu.zero = !result;
}

export default ror;
