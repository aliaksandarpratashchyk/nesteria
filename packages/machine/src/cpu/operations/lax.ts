/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Load Accumulator and X
 *
 * LDA + LDX
 *
 * Unofficial opcode that combines the behavior of LDA and LDX.
 * @see {@link lda} for more about LDA
 * @see {@link ldx} for more about LDX
 *
 * @remarks
 * Affects negative and zero flags.
 *
 * @param cpu
 */
function lax(cpu: CPU, data: number): void {
	cpu.accumulator = data;
	cpu.x = data;
	cpu.negative = !!(data & 0x80);
	cpu.zero = !data;
}

export default lax;
