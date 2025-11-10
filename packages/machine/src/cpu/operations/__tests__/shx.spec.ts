/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import shx from '../shx';

/**
 * Operation semantics: SHX (Unofficial)
 * - Unofficial opcode; behavior varies across hardware. Tests document the semantics this emulator implements.
 */
describe(shx.name, () => {
	describe.each`
		x       | address   | expectedMemory
		${0xff} | ${0x0102} | ${0x02}
	`('when X=$x and address=$address', ({ address, expectedMemory, x }) => {
		it(`should store ${expectedMemory} in memory`, () => {
			const console = new Machine();
			console.cpu.x = x;

			shx(console.cpu, address);

			expect(console.cpu.bus.read(address)).toBe(expectedMemory);
		});
	});
});
