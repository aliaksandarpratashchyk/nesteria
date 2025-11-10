/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Logical Shift Right, then Exclusive OR
 *
 * LSR + EOR
 *
 * Unofficial opcode that combines the behaviors of LSR and EOR.
 * @see {@link lsr} for more about LSR
 * @see {@link eor} for more about EOR
 *
 * @param cpu - CPU
 */
function sre(cpu: CPU, address: number, data: number): void {
	cpu.carry = !!(data & 0x01);
	const result = (data >> 1) & 0x7f;

	cpu.bus.write(address, result);

	cpu.negative = false;
	cpu.zero = !result;

	cpu.accumulator ^= result;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default sre;
