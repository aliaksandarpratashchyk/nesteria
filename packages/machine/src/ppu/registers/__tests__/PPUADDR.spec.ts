/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../../../Machine';
import PPUADDR from '../PPUADDR';

describe(PPUADDR.name, () => {
	describe(PPUADDR.prototype.write.name, () => {
		describe.each`
			ppu                                     | data    | expectedPPU
			${{ latch: false, ppuAddress: 0x3fff }} | ${0x01} | ${{ latch: true, ppuAddress: 0x01ff }}
			${{ latch: false, ppuAddress: 0x3fff }} | ${0xff} | ${{ latch: true, ppuAddress: 0x3fff }}
			${{ latch: true, ppuAddress: 0x3fff }}  | ${0x01} | ${{ latch: false, ppuAddress: 0x3f01 }}
		`('when the PPU is $ppu and the data is $data', ({ data, expectedPPU, ppu }) => {
			it(`should set the PPU to ${JSON.stringify(expectedPPU)}.`, () => {
				const machine = new Machine();
				Object.assign(machine.ppu, ppu);

				const ppuaddr = new PPUADDR(machine.ppu);
				ppuaddr.write(data);

				expect(machine.ppu).toMatchExpectedFields(expectedPPU);
			});
		});
	});
});
