/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * Test Bits with Accumulator
 *
 * Z = !(A & M); N = M7; V = M6
 *
 * Tests the contents of memory against the accumulator.
 * 1. Sets zero if (A & M) == 0; clears it otherwise.
 * 2. Copies memory bit 7 into the negative flag.
 * 3. Copies memory bit 6 into the overflow flag.
 *
 * @param cpu - CPU
 */
function bit(cpu: CPU, data: number): void {
	cpu.zero = !(data & cpu.accumulator);
	cpu.negative = !!(data & 0x80);
	cpu.overflow = !!(data & 0x40);
}

export default bit;
