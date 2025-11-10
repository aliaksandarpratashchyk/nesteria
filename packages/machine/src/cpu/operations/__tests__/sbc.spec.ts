/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import sbc from '../sbc';

/**
 * Operation semantics: SBC (Subtract with Borrow)
 * - Computes A = A - data - (1 - C).
 * - Sets flags: N from bit7 of result, Z if result==0, C set if no borrow
 *   occurred (i.e., A >= data + (1 - C_in)), V on signed overflow.
 * SBC uses inverted carry for borrow: A = A - data - (1 - C).
 * Flags (NV-BDIZC) are set based on the 8-bit result and carry out of bit 7.
 * These cases cover: borrow when C=0, exact subtraction when C=1,
 * wrap-around behaviour, and resulting flag combinations.
 */
describe(sbc.name, () => {
	describe.each`
		accumulator | processorStatus | data    | expectedAccumulator | expectedProcessorStatus
		${0x00}     | ${0b0000_0000}  | ${0x00} | ${0xff}             | ${0b1010_0000}
		${0x01}     | ${0b0000_0000}  | ${0x01} | ${0xff}             | ${0b1010_0000}
		${0x01}     | ${0b0000_0001}  | ${0x01} | ${0x00}             | ${0b0010_0011}
		${0xff}     | ${0b0000_0000}  | ${0x01} | ${0xfd}             | ${0b1010_0001}
		${0x01}     | ${0b0000_0000}  | ${0xff} | ${0x01}             | ${0b0010_0000}
	`(
		'when the accumulator is $accumulator, the processor status is $processor status and the data is $data',
		({ accumulator, data, expectedAccumulator, expectedProcessorStatus, processorStatus }) => {
			it(
				`should set the accumulator to ${expectedAccumulator} ` +
					`and set the processor status to ${expectedProcessorStatus}.`,
				() => {
					const console = new Machine();
					console.cpu.accumulator = accumulator;
					console.cpu.processorStatus = processorStatus;

					sbc(console.cpu, data);

					expect(console.cpu.accumulator).toBe(expectedAccumulator);
					expect(console.cpu.processorStatus).toBe(expectedProcessorStatus);
				},
			);
		},
	);
});
