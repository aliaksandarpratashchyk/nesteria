/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import immediate from '../immediate';

const SOME_BYTE = 0x1;

/**
 * Addressing semantics: immediate
 * - Operand is the next byte in program memory.
 * - Increments program counter by 1.
 */
describe('immediate', () => {
	describe('resolve', () => {
		it('should return "immediate".', () => {
			const console = new Machine();

			expect(immediate.resolve(console.cpu)).toBe('immediate');
		});
	});
	describe('read', () => {
		it('should return value in program memory and increase program counter by 1.', () => {
			const console = new Machine();
			console.cpu.bus.write(console.cpu.programCounter, SOME_BYTE);

			const previousProgramCounter = console.cpu.programCounter;

			expect(immediate.read(console.cpu, immediate.resolve(console.cpu))).toBe(SOME_BYTE);
			expect(console.cpu.programCounter).toBe(previousProgramCounter + 1);
		});
	});
});
