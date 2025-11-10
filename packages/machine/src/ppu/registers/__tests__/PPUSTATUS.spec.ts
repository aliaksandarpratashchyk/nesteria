/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../../../Machine';
import PPUSTATUS from '../PPUSTATUS';

describe(PPUSTATUS.name, () => {
	describe(PPUSTATUS.prototype.read.name, () => {
		describe.each`
			ppu                         | expectedData
			${{ vblank: true }}         | ${0b1000_0000}
			${{ spriteZeroHit: true }}  | ${0b0100_0000}
			${{ spriteOverflow: true }} | ${0b0010_0000}
		`('when the PPU is $ppu', ({ expectedData, ppu }) => {
			it(`should return ${expectedData} and reset the vblank and the latch.`, () => {
				const machine = new Machine();
				Object.assign(machine.ppu, ppu);
				machine.ppu.latch = true;

				const ppustatus = new PPUSTATUS(machine.ppu);

				expect(ppustatus.read()).toBe(expectedData);
				expect(machine.ppu.vblank).toBeFalsy();
				expect(machine.ppu.latch).toBeFalsy();
			});
		});
	});
});
