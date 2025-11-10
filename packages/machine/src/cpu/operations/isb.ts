/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

import { NEGATIVE_FLAG_MASK } from '../flags';

/**
 * Increment memory, then Subtract with Borrow
 *
 * INC + SBC
 *
 * Unofficial opcode that combines the behaviors of INC and SBC.
 *
 * @remarks
 * Also known as ISC.
 *
 * @param cpu
 * @param address
 */
function isb(cpu: CPU, address: number, data: number): void {
	const incResult = (data + 0x01) & 0xff;
	cpu.bus.write(address, incResult);

	const sbcResult = cpu.accumulator - incResult - (1 - +cpu.carry);

	cpu.negative = !!(sbcResult & 0x80);
	cpu.overflow =
		((cpu.accumulator ^ sbcResult) & (incResult ^ 0xff ^ sbcResult) & NEGATIVE_FLAG_MASK) !== 0;

	cpu.zero = !(sbcResult & 0xff);
	cpu.carry = !(sbcResult & 0xff00);

	cpu.accumulator = sbcResult & 0xff;
}

export default isb;
