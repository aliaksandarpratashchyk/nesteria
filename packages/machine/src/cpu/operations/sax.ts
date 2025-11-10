/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Store Accumulator and X
 *
 * M = A & X
 *
 * Unofficial operation, which stores in the memory the result of bitwise AND
 * between the contents of the accumulator and the register X.
 *
 * @remarks
 * Also known as AAX.
 *
 * @param cpu - CPU
 */
function sax(cpu: CPU, address: number): void {
	cpu.bus.write(address, cpu.accumulator & cpu.x);
}

export default sax;
