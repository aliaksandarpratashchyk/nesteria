/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../../../Machine';
import PPUMASK from '../PPUMASK';

describe(PPUMASK.name, () => {
	describe(PPUMASK.prototype.write.name, () => {
		describe.each`
			data           | expectedPPU
			${0b1000_0000} | ${{ emphasizeBlue: true }}
			${0b0100_0000} | ${{ emphasizeGreen: true }}
			${0b0010_0000} | ${{ emphasizeRed: true }}
			${0b0001_0000} | ${{ enableSpriteRendering: true }}
			${0b0000_1000} | ${{ enableBackgroundRendering: true }}
			${0b0000_0100} | ${{ showSpritesInLeftmost8PixelsOfScreen: true }}
			${0b0000_0010} | ${{ showBackgroundInLeftmost8PixelsOfScreen: true }}
			${0b0000_0001} | ${{ grayscale: true }}
		`('when the data is $data', ({ data, expectedPPU }) => {
			it(`should set the PPU to ${JSON.stringify(expectedPPU)}.`, () => {
				const machine = new Machine();
				const ppumask = new PPUMASK(machine.ppu);

				ppumask.write(data);

				expect(machine.ppu).toMatchExpectedFields(expectedPPU);
			});
		});
	});
});
