/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';

/**
 * Implementation of the write-only PPUSCROLL register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Writes the X or Y scroll depending on the internal latch, then toggles the latch.
 */
class PPUSCROLL extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		// eslint-disable-next-line no-negated-condition
		if (!this.ppu.latch) this.ppu.scrollX = data & 0xff;
		else this.ppu.scrollY = data & 0xff;

		this.ppu.latch = !this.ppu.latch;
	}
}

export default PPUSCROLL;
