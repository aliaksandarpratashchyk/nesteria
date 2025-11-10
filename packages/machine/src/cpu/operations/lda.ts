/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * LoaD Accumulator
 *
 * Loads the contents of the specified memory location or immediate into the accumulator.
 *
 * @remarks
 * Affects the negative and zero flags.
 *
 * @param cpu - CPU
 */
function lda(cpu: CPU, data: number): void {
	cpu.accumulator = data;
	cpu.negative = !!(data & 0x80);
	cpu.zero = !data;
}

export default lda;
