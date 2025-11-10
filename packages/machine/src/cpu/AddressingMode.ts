/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from './CPU';
import type { OperandAddress } from './OperandAddress';
import type { OperandAddressResolver } from './OperandAddressResolver';

/**
 * Describes a 6502 addressing mode: how to resolve an instruction's
 * operand address and how to read the operand value for that mode.
 *
 * Different modes may return either a numeric memory address or a
 * symbolic target such as `accumulator`, `immediate`, or `implied`.
 *
 * @typeParam T Effective address type for the mode.
 */
export interface AddressingMode<T extends OperandAddress> {
	/**
	 * Reads the operand value according to the addressing mode.
	 * - For numeric addresses, reads from memory via the bus.
	 * - For `immediate`, fetches the next byte and advances the program counter.
	 * - For `accumulator`, returns the A register value.
	 * - For `implied` or `relative`, typically returns 0 (value unused).
	 *
	 * @param cpu CPU instance providing registers, PC and bus access.
	 * @param address Effective address or symbolic target returned by `resolve`.
	 * @returns 8‑bit operand value to pass to the instruction operation.
	 */
	read: (cpu: CPU, address: T) => number;

	/**
	 * Resolves the effective operand address based on the current CPU state.
	 * Implementations typically consume one or more bytes from the program
	 * counter while computing the address.
	 *
	 * When supported by the mode, setting `extraCycles` to true applies the
	 * 6502's page‑crossing cycle penalty (e.g., Absolute,X; Absolute,Y; (Indirect),Y).
	 */
	resolve: OperandAddressResolver<T>;
}
