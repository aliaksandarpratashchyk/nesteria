/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

export const ACCUMULATOR = 'accumulator';

export const IMMEDIATE = 'immediate';

export const IMPLIED = 'implied';

/**
 * Represents an effective operand address or a symbolic target for modes
 * that do not reference memory directly.
 * - `number`: a 16‑bit memory address
 * - `accumulator`: the A register is the operand source/target
 * - `immediate`: the next byte(s) after the opcode contain the operand
 * - `implied`: the instruction has no explicit operand
 */
export type OperandAddress = number | typeof ACCUMULATOR | typeof IMMEDIATE | typeof IMPLIED;
