/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../../../Machine';
import PPUSCROLL from '../PPUSCROLL';

describe(PPUSCROLL.name, () => {
	describe(PPUSCROLL.prototype.write.name, () => {
		describe.each`
			ppu                                | data    | expectedPPU
			${{ latch: false, scrollX: 0x00 }} | ${0x01} | ${{ latch: true, scrollX: 0x01 }}
			${{ latch: true, scrollY: 0x00 }}  | ${0x01} | ${{ latch: false, scrollY: 0x01 }}
		`('when the PPU is $ppu and the data is $data', ({ data, expectedPPU, ppu }) => {
			it(`should set the PPU to ${JSON.stringify(expectedPPU)}.`, () => {
				const machine = new Machine();
				Object.assign(machine.ppu, ppu);

				const ppuscroll = new PPUSCROLL(machine.ppu);
				ppuscroll.write(data);

				expect(machine.ppu).toMatchExpectedFields(expectedPPU);
			});
		});
	});
});
