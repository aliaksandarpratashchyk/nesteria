/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine from '../../../Machine';
import PPUDATA from '../PPUDATA';

describe(PPUDATA.name, () => {
	describe(PPUDATA.prototype.read.name, () => {
		describe.each`
			buffer  | address   | increment | bus     | expectedData | expectedBuffer | expectedAddress
			${0x01} | ${0x0000} | ${0}      | ${0x02} | ${0x01}      | ${0x02}        | ${0x0001}
			${0x01} | ${0x0000} | ${1}      | ${0x02} | ${0x01}      | ${0x02}        | ${0x0020}
			${0x01} | ${0x3f00} | ${0}      | ${0x02} | ${0x02}      | ${0x02}        | ${0x3f01}
			${0x01} | ${0x3f00} | ${1}      | ${0x02} | ${0x02}      | ${0x02}        | ${0x3f20}
		`(
			'when the buffer is $buffer, the PPU address is $address, the PPU address incremenet is $increment and $bus is on bus',
			({ address, buffer, bus, expectedAddress, expectedBuffer, expectedData, increment }) => {
				it(`should return ${expectedData}, set the buffer to ${expectedBuffer} and the PPU address to ${expectedAddress}.`, () => {
					const machine = new Machine();
					machine.ppu.buffer = buffer;
					machine.ppu.ppuAddress = address;
					machine.ppu.ppuAddressIncrement = increment;
					machine.ppu.bus.write(address, bus);

					const ppudata = new PPUDATA(machine.ppu);

					expect(ppudata.read()).toBe(expectedData);
					expect(machine.ppu.buffer).toBe(expectedBuffer);
					expect(machine.ppu.ppuAddress).toBe(expectedAddress);
				});
			},
		);
	});

	describe(PPUDATA.prototype.write.name, () => {
		describe.each`
			address   | increment | data    | expectedBus | expectedAddress
			${0x0000} | ${0}      | ${0x01} | ${0x01}     | ${0x0001}
			${0x0000} | ${1}      | ${0x01} | ${0x01}     | ${0x0020}
		`(
			'when the PPU address is $address, the address increment is $increment and the data is $data',
			({ address, increment, data, expectedAddress, expectedBus }) => {
				it(`should set ${expectedBus} to the bus and set the PPU address to ${expectedAddress}.`, () => {
					const machine = new Machine();
					machine.ppu.ppuAddress = address;
					machine.ppu.ppuAddressIncrement = increment;

					const ppudata = new PPUDATA(machine.ppu);
					ppudata.write(data);

					expect(machine.ppu.bus.read(address)).toBe(expectedBus);
					expect(machine.ppu.ppuAddress).toBe(expectedAddress);
				});
			},
		);
	});
});
