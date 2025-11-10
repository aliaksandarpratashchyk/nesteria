/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from './CPU';
import type { OperandAddress } from './OperandAddress';

/**
 * Computes the effective operand address for a specific addressing mode.
 * Implementations may consume bytes from the program counter as needed.
 *
 * When `extraCycles` is true, a resolver may apply the 6502 page‑crossing
 * cycle penalty for modes that require it (e.g., Absolute,X; Absolute,Y; (Indirect),Y).
 */
export type OperandAddressResolver<T extends OperandAddress> = (
	cpu: CPU,
	extraCycles?: number,
) => T;
