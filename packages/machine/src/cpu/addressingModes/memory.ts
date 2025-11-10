/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { AddressingMode } from '../AddressingMode';
import type CPU from '../CPU';
import type { OperandAddressResolver } from '../OperandAddressResolver';

/**
 * Wraps a resolver that produces a numeric memory address into a full
 * addressing mode which reads the value from the bus.
 *
 * @param resolve Function that computes the effective address.
 */
function memory(resolve: OperandAddressResolver<number>): AddressingMode<number> {
	return {
		read(cpu: CPU, address: number): number {
			return cpu.bus.read(address);
		},
		resolve,
	};
}

export default memory;
