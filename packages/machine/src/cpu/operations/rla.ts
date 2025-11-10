/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Rotate Left, then AND with Accumulator
 *
 * ROL + AND
 *
 * Unofficial opcode that combines the behaviors of ROL and AND.
 * @see {@link rol} for more about ROL
 * @see {@link and} for more about AND
 *
 * @param cpu - CPU
 */
function rla(cpu: CPU, address: number, data: number): void {
	const { carry } = cpu;
	cpu.carry = !!(data & 0x80);
	const result = ((data << 1) & 0xff) | +carry;

	cpu.bus.write(address, result);

	cpu.accumulator &= result;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default rla;
