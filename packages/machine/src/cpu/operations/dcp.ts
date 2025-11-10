/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Decrement memory, then ComPare with accumulator
 *
 * DEC + CMP
 *
 * Unofficial operation, which combines behaviours of DEC and CMP.
 *
 * @param cpu - CPU
 */
function dcp(cpu: CPU, address: number, data: number): void {
	const decResult = (data + 0xff) & 0xff;
	cpu.bus.write(address, decResult);

	const cmpResult = cpu.accumulator - decResult;
	cpu.zero = !cmpResult;
	cpu.negative = !!(cmpResult & 0x80);
	cpu.carry = cmpResult >= 0;
}

export default dcp;
