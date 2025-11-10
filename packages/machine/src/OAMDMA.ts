/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */
import type { WriteOnlyDevice } from './Bus';
import type CPU from './cpu/CPU';
import type PPU from './ppu/PPU';

/**
 * Number of CPU cycles spent copying directly into OAM starting on event CPU cycle.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU OAM DMA.
 */
export const OAMDMA_EVEN_CPU_EXTRA_CYCLES = 513;

/**
 * Number of CPU cycles spent copying directly into OAM starting on odd CPU cycle.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU OAM DMA.
 */
export const OAMDMA_ODD_CPU_EXTRA_CYCLES = 514;

/**
 * Implementation of the write-only OAMDMA register.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for details about PPU registers.
 *
 * Treats the provided data as a page number and copies the page's contents into OAM.
 * @remarks Increments the CPU cycle counter by 513 for even CPU cycles or by 514 for odd.
 */
class OAMDMA implements WriteOnlyDevice {
	readonly cpu: CPU;
	readonly ppu: PPU;

	constructor(cpu: CPU, ppu: PPU) {
		this.cpu = cpu;
		this.ppu = ppu;
	}

	write(data: number): void {
		const start = (data << 8) & 0xff00;

		for (let index = 0; index < this.ppu.oam.capacity; index++) {
			const value = this.cpu.bus.read(start + index);
			this.ppu.oam.write(value, index);
		}

		this.cpu.cycles +=
			this.cpu.cycles & 1 ? OAMDMA_EVEN_CPU_EXTRA_CYCLES : OAMDMA_ODD_CPU_EXTRA_CYCLES;
	}
}
export default OAMDMA;
