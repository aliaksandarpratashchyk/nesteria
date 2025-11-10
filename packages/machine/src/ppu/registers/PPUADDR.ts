/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from '../../Bus';

import PPURegister from '../PPURegister';
/**
 * Implementation of the write-only PPUADDR register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Writes the high or low byte of the PPU address depending on the internal latch, then toggles the latch.
 */
class PPUADDR extends PPURegister implements WriteOnlyDevice {
	write(data: number): void {
		// eslint-disable-next-line no-negated-condition
		if (!this.ppu.latch) {
			// High byte (only 6 bits used in PPU address), then toggle latch
			this.ppu.ppuAddress = ((data << 8) & 0x3f00) | (this.ppu.ppuAddress & 0x00ff);
		} else {
			// Low byte
			this.ppu.ppuAddress = (this.ppu.ppuAddress & 0xff00) | (data & 0xff);
		}
		this.ppu.latch = !this.ppu.latch;
	}
}
export default PPUADDR;
