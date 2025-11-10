/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Shift Left then OR with Accumulator
 *
 * ASL + ORA
 *
 * Unofficial opcode that combines the behaviors of ASL and ORA.
 * @see {@link asl} for more about ASL
 * @see {@link ora} for more about ORA
 *
 * @param cpu - CPU
 */
function slo(cpu: CPU, address: number, data: number): void {
	cpu.carry = !!(data & 0x80);
	const result = (data << 1) & 0xff;

	cpu.bus.write(address, result);

	cpu.accumulator |= result;
	cpu.negative = !!(cpu.accumulator & 0x80);
	cpu.zero = !cpu.accumulator;
}

export default slo;
