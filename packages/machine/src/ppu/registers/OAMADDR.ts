/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';

/**
 * Implementation of the write-only OAMADDR register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Treats the data as an OAM address and stores it in the PPU.
 */
class OAMADDR extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		this.ppu.oamAddress = data & 0xff;
	}
}

export default OAMADDR;
