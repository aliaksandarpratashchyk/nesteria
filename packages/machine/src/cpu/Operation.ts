/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from './AddressingMode';
import type CPU from './CPU';
import type { OperandAddress } from './OperandAddress';

export type AddressOnlyOperation<T extends OperandAddress> = (cpu: CPU, address: T) => void;

export type DataOnlyOperation = (cpu: CPU, data: number) => void;

export type FullOperation<T extends OperandAddress> = (cpu: CPU, address: T, data: number) => void;

export type Operation<T extends OperandAddress> = (
	cpu: CPU,
	addressingModel: AddressingMode<T>,
	extraCycles?: number,
) => void;

export function addressOnly<T extends OperandAddress>(
	operation: AddressOnlyOperation<T>,
): Operation<T> {
	return (cpu: CPU, { resolve }: AddressingMode<T>, extraCycles?: number): void => {
		operation(cpu, resolve(cpu, extraCycles));
	};
}

export function dataOnly<T extends OperandAddress>(operation: DataOnlyOperation): Operation<T> {
	return (cpu: CPU, { read, resolve }: AddressingMode<T>, extraCycles?: number): void => {
		operation(cpu, read(cpu, resolve(cpu, extraCycles)));
	};
}

export function full<T extends OperandAddress>(operation: FullOperation<T>): Operation<T> {
	return (cpu: CPU, { read, resolve }: AddressingMode<T>, extraCycles?: number): void => {
		const address = resolve(cpu, extraCycles);
		operation(cpu, address, read(cpu, address));
	};
}
