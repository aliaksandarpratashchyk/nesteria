/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';
import type { IMMEDIATE } from '../OperandAddress';

import { NEGATIVE_FLAG_MASK } from '../flags';

/**
 * Rotate Right, then Add with Carry
 *
 * ROR + ADC
 *
 * Unofficial opcode that combines the behaviors of ROR and ADC.
 * @see {@link ror} for more about ROR
 * @see {@link adc} for more about ADC
 *
 * @param cpu - CPU
 */
function rra(cpu: CPU, address: number | typeof IMMEDIATE, data: number): void {
	const { carry } = cpu;
	cpu.carry = !!(data & 0x01);
	const rorResult = ((data >> 1) & 0x7f) | (+carry << 7);

	if (typeof address === 'number') cpu.bus.write(address, rorResult);

	const adcResult = cpu.accumulator + rorResult + +cpu.carry;

	cpu.negative = !!(adcResult & 0x80);
	cpu.overflow =
		((cpu.accumulator ^ adcResult) & (rorResult ^ adcResult) & NEGATIVE_FLAG_MASK) !== 0;

	cpu.zero = !(adcResult & 0xff);
	cpu.carry = !!(adcResult & 0xff00);

	cpu.accumulator = adcResult & 0xff;
}

export default rra;
