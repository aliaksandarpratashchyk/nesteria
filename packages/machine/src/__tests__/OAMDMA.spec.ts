/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import Machine from '../Machine';
import OAMDMA from '../OAMDMA';
import bytes from '../bytes';

const page = bytes(256);

describe(OAMDMA.name, () => {
	describe(OAMDMA.prototype.write.name, () => {
		describe.each`
			address   | ram     | cycles | data    | expectedOAM | expectedCycles
			${0x0100} | ${page} | ${0}   | ${0x01} | ${page}     | ${514}
			${0x0100} | ${page} | ${1}   | ${0x01} | ${page}     | ${514}
		`(
			'when the address is $address, the RAM is $ram, the data is $data and CPU cycles is $cycles',
			({ address, cycles, data, expectedCycles, expectedOAM, ram }) => {
				it(`should set the OAM to ${expectedOAM} and CPU cycles to ${expectedCycles}.`, () => {
					const machine = new Machine();
					machine.cpu.cycles = cycles;
					machine.ram.raw.set(ram, address);

					const oamdma = new OAMDMA(machine.cpu, machine.ppu);
					oamdma.write(data);

					expect(Array.from(machine.ppu.oam.raw)).toEqual(expectedOAM);
					expect(machine.cpu.cycles).toBe(expectedCycles);
				});
			},
		);
	});
});
