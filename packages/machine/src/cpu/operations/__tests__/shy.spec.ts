/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import shy from '../shy';

/**
 * Operation semantics: SHY (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(shy.name, () => {
	describe.each`
		y       | address   | expectedMemory
		${0xff} | ${0x0102} | ${0x02}
	`('when Y=$y and address=$address', ({ address, expectedMemory, y }) => {
		it(`should store ${expectedMemory} in memory`, () => {
			const console = new Machine();
			console.cpu.y = y;

			shy(console.cpu, address);

			expect(console.cpu.bus.read(address)).toBe(expectedMemory);
		});
	});
});
