/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { ReadOnlyDevice, WriteOnlyDevice } from '../../Bus';

import PPUAddressIncrement from '../PPUAddressIncrement';
import PPURegister from '../PPURegister';

/**
 * Implementation of the PPUDATA register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Reads from or writes to PPU memory, then increments the PPU address according to
 * the VRAM address increment flag.
 *
 * @remarks
 * Uses the internal read buffer. For addresses below 0x3F00, reads return the previous buffer value;
 * for addresses at or above 0x3F00 (palette), reads return the freshly fetched value.
 */
class PPUDATA extends PPURegister implements ReadOnlyDevice, WriteOnlyDevice {
	read(): number {
		let { buffer } = this.ppu;
		this.ppu.buffer = this.ppu.bus.read(this.ppu.ppuAddress);

		if (this.ppu.ppuAddress >= 0x3f00) buffer = this.ppu.buffer;

		this.ppu.ppuAddress =
			(this.ppu.ppuAddress + (this.ppu.ppuAddressIncrement === PPUAddressIncrement.Down ? 32 : 1)) &
			0x3fff;

		return buffer;
	}

	write(data: number): void {
		this.ppu.bus.write(this.ppu.ppuAddress, data);
		this.ppu.ppuAddress =
			(this.ppu.ppuAddress + (this.ppu.ppuAddressIncrement === PPUAddressIncrement.Down ? 32 : 1)) &
			0x3fff;
	}
}

export default PPUDATA;
