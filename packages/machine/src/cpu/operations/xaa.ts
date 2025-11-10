/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * AND Accumulator with X and immediate
 *
 * A = A & X & #immediate
 *
 * Unofficial opcode that stores into the accumulator the result of
 * a bitwise AND between the accumulator, the X register, and the data.
 *
 * @param cpu - CPU
 */
function xaa(cpu: CPU, data: number): void {
	cpu.accumulator = cpu.accumulator & cpu.x & data;
}

export default xaa;
