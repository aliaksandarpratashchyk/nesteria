/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import OAMDATA from '../OAMDATA';

describe(OAMDATA.name, () => {
	describe(OAMDATA.prototype.write.name, () => {
		describe.each`
			oamAddress | data    | expectedOAM | expectedOAMAddress
			${0x01}    | ${0x03} | ${0x03}     | ${0x02}
			${0xff}    | ${0x03} | ${0x03}     | ${0x00}
		`(
			'when the OAM address is $oamAddress and the data is $data',
			({ data, expectedOAM, expectedOAMAddress, oamAddress }) => {
				it(`should set ${expectedOAM} on OAM and set the OAM address to ${expectedOAMAddress}.`, () => {
					const machine = new Machine();
					machine.ppu.oamAddress = oamAddress;

					const oamdata = new OAMDATA(machine.ppu);
					oamdata.write(data);

					expect(machine.ppu.oam.read(oamAddress)).toBe(expectedOAM);
					expect(machine.ppu.oamAddress).toBe(expectedOAMAddress);
				});
			},
		);
	});
});
