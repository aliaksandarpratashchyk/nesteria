/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import NameTable from '../../NameTable';
import PatternTable from '../../PatternTable';
import PPUAddressIncrement from '../../PPUAddressIncrement';
import PPUMode from '../../PPUMode';
import SpriteSize from '../../SpriteSize';
import PPUCTRL from '../PPUCTRL';

describe(PPUCTRL.name, () => {
	describe(PPUCTRL.prototype.write.name, () => {
		describe.each`
			data           | expectedPPU
			${0b1000_0000} | ${{ nmiEnabled: true }}
			${0b0100_0000} | ${{ mode: PPUMode.Master }}
			${0b0010_0000} | ${{ spriteSize: SpriteSize.Long }}
			${0b0001_0000} | ${{ backgroundPatternTable: PatternTable.Second }}
			${0b0000_1000} | ${{ spritePatternTable: PatternTable.Second }}
			${0b0000_0100} | ${{ ppuAddressIncrement: PPUAddressIncrement.Down }}
			${0b0000_0011} | ${{ baseNameTable: NameTable.BottomRight }}
			${0b0000_0010} | ${{ baseNameTable: NameTable.BottomLeft }}
			${0b0000_0001} | ${{ baseNameTable: NameTable.TopRight }}
			${0b0000_0000} | ${{ baseNameTable: NameTable.TopLeft }}
		`('when the data is $data', ({ data, expectedPPU }) => {
			it(`should set the PPU to ${JSON.stringify(expectedPPU)}.`, () => {
				const machine = new Machine();

				const ppuctrl = new PPUCTRL(machine.ppu);
				ppuctrl.write(data);

				expect(machine.ppu).toMatchExpectedFields(expectedPPU);
			});
		});
	});
});
