/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';

/**
 * Implementation of the write-only OAMDATA register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Writes data to OAM, then increments the OAM address.
 */
class OAMDATA extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		this.ppu.oam.write(data, this.ppu.oamAddress);
		this.ppu.oamAddress = (this.ppu.oamAddress + 1) & 0xff;
	}
}

export default OAMDATA;
