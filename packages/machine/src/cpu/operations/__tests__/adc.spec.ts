/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import adc from '../adc';

/**
 * Operation semantics: ADC (Add with Carry)
 * - Computes A = A + data + C.
 * - Sets flags: N from bit7 of result, Z if result==0, C on unsigned carry out,
 *   V on signed overflow ((~(A^data) & (A^result) & 0x80) != 0).
 * - NES CPU ignores decimal mode; addition is always binary.
 */
describe(adc.name, () => {
	describe.each`
		accumulator | processorStatus | data    | expectedAccumulator | expectedProcessorStatus
		${0x00}     | ${0b0000_0001}  | ${0x00} | ${0x01}             | ${0b0010_0000}
		${0x01}     | ${0b0000_0001}  | ${0x01} | ${0x03}             | ${0b0010_0000}
		${0x7f}     | ${0b0000_0001}  | ${0x01} | ${0x81}             | ${0b1110_0000}
		${0xff}     | ${0b0000_0001}  | ${0x01} | ${0x01}             | ${0b0010_0001}
		${0x01}     | ${0b0000_0001}  | ${0xff} | ${0x01}             | ${0b0010_0001}
	`(
		'when the accumulator is $accumulator, the processor status is $processorStatus and the data is $data',
		({ accumulator, data, expectedAccumulator, expectedProcessorStatus, processorStatus }) => {
			it(`should set accumulator=${expectedAccumulator} and processorStatus=${expectedProcessorStatus}.`, () => {
				const console = new Machine();
				console.cpu.accumulator = accumulator;
				console.cpu.processorStatus = processorStatus;

				adc(console.cpu, data);

				expect(console.cpu).toMatchObject({
					accumulator: expectedAccumulator,
					processorStatus: expectedProcessorStatus,
				});
			});
		},
	);
});
