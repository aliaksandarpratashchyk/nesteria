/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../../../Machine';
import OAMADDR from '../OAMADDR';

describe(OAMADDR.name, () => {
	describe(OAMADDR.prototype.write.name, () => {
		describe.each`
			data     | expectedOAMAddress
			${0x01}  | ${0x01}
			${0x101} | ${0x01}
		`('when the data is $data', ({ data, expectedOAMAddress }) => {
			it(`should set the OAM address to ${expectedOAMAddress}.`, () => {
				const machine = new Machine();

				const oamaddr = new OAMADDR(machine.ppu);
				oamaddr.write(data);

				expect(machine.ppu.oamAddress).toBe(expectedOAMAddress);
			});
		});
	});
});
