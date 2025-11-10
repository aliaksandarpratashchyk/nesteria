/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from './AddressingMode';
import type { OperandAddress } from './OperandAddress';
import type { Operation } from './Operation';

/**
 * Describes a single 6502 instruction variant (opcode) with its
 * operation implementation, addressing mode and cycle timing.
 */
export interface InstructionDescriptor<T extends OperandAddress = OperandAddress> {
	/** Addressing mode used to resolve and read the operand. */
	addressing: AddressingMode<T>;
	/** Base cycle count for the opcode. */
	cycles?: number;
	/**
	 * When true, addressing may add a page‑crossing cycle (if applicable).
	 * Passed to `addressing.resolve(cpu, extraCycles)`.
	 */
	extraCycles?: number;
	/** The function that executes the instruction semantics. */
	operation: Operation<T>;
}

// eslint-disable-next-line @typescript-eslint/max-params
export function instruction<
	TOperationOperandAddress extends OperandAddress,
	TAddressingOperandAddress extends TOperationOperandAddress,
>(
	operation: Operation<TOperationOperandAddress>,
	addressing: AddressingMode<TAddressingOperandAddress>,
	cycles?: number,
	extraCycles?: number,
): InstructionDescriptor {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return {
		addressing,
		cycles,
		extraCycles,
		operation,
	} as unknown as InstructionDescriptor;
}
