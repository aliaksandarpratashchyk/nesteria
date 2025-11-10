/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { MapperTable } from './Mapper';

import { type Cartridge, type CartridgeType, INES } from './Cartridge';
import { INES_MAPPER_TABLE } from './cartridges/ines';
import CPU from './cpu/CPU';
import OAMDMA from './OAMDMA';
import PPU from './ppu/PPU';
import PPUMemory from './ppu/PPUMemory';
import OAMADDR from './ppu/registers/OAMADDR';
import OAMDATA from './ppu/registers/OAMDATA';
import PPUADDR from './ppu/registers/PPUADDR';
import PPUCTRL from './ppu/registers/PPUCTRL';
import PPUDATA from './ppu/registers/PPUDATA';
import PPUMASK from './ppu/registers/PPUMASK';
import PPUSCROLL from './ppu/registers/PPUSCROLL';
import PPUSTATUS from './ppu/registers/PPUSTATUS';
import RAM from './RAM';

/**
 * NES RAM size (2 KiB).
 */
export const RAM_CAPACITY = 2 * 1024;

/**
 * NES RAM range start address.
 */
export const RAM_START = 0x0000;

/**
 * NES RAM mirroring region end address.
 */
export const RAM_END = 0x1fff;

/**
 * PPUCTRL register base address.
 */
export const PPUCTRL_START = 0x2000;

/**
 * PPUMASK register base address.
 */
export const PPUMASK_START = 0x2001;

/**
 * PPUSTATUS register base address.
 */
export const PPUSTATUS_START = 0x2002;

/**
 * OAMADDR register base address.
 */
export const OAMADDR_START = 0x2003;

/**
 * OAMDATA register base address.
 */
export const OAMDATA_START = 0x2004;

/**
 * PPUSCROLL register base address.
 */
export const PPUSCROLL_START = 0x2005;

/**
 * PPUADDR register base address.
 */
export const PPUADDR_START = 0x2006;

/**
 * PPUDATA register base address.
 */
export const PPUDATA_START = 0x2007;

/**
 * End address of the PPU mirroring range.
 */
export const PPU_END = 0x3fff;

/**
 * Number of PPU registers.
 */
export const PPU_REGISTER_COUNT = 8;

/**
 * OAMDMA register address.
 */
export const OAMDMA_ADDRESS = 0x4014;

/**
 * Cartridge program ROM start address.
 */
export const PRGROM_START = 0x8000;

/**
 * Cartridge program ROM end address.
 */
export const PRGROM_END = 0xffff;

/**
 * Cartridge character ROM start address.
 */
export const CHRROM_START = 0x0000;

/**
 * Cartridge character ROM end address.
 */
export const CHRROM_END = 0x1fff;

/**
 * Video RAM start address.
 */
export const VRAM_START = 0x2000;

/**
 * Video RAM end address.
 */
export const VRAM_END = 0x3eff;

/**
 * Video RAM size.
 */
export const VRAM_CAPACITY = 2 * 1024;

/**
 * Map that associates the game file format with its mapper table.
 */
const MAPPER_TABLE_MAP: Record<CartridgeType, MapperTable> = {
	[INES]: INES_MAPPER_TABLE,
};

/**
 * Generous upper bound of PPU cycles per frame
 */
const MAX_FRAME_CYCLES = 2_000_000;

/**
 * A software implementation of the NES.
 *
 * @public
 */
class Machine {
	/**
	 * The CPU.
	 */
	readonly cpu = new CPU();

	/**
	 * The PPU.
	 */
	readonly ppu: PPU;

	/**
	 * The RAM.
	 */
	readonly ram = new RAM(RAM_CAPACITY);

	/**
	 * The video RAM (legacy/unused for mapping, kept for potential diagnostics).
	 */
	readonly vram = new RAM(VRAM_CAPACITY);

	get cartridge(): Cartridge | null {
		return this.#cartridge;
	}
	#animationId: null | number = null;
	#cartridge: Cartridge | null = null;
	readonly #frameRequestCallback: FrameRequestCallback;

	#lastFrameTimestamp = 0;

	constructor() {
		this.#frameRequestCallback = this.#onFrameRequest.bind(this);

		this.#connectRAM();

		this.ppu = new PPU(this);

		this.#connectPPU();
		this.#connectOAMDMA();
	}

	insert(cartridge: Cartridge): void {
		this.#cartridge = cartridge;

		const createMapper = MAPPER_TABLE_MAP[cartridge.type][cartridge.mapper];

		if (!createMapper)
			throw new Error(`Can't find mapper #${cartridge.mapper} for ${cartridge.type} cartridge.`);

		const mapper = createMapper(cartridge);

		this.cpu.bus.connect(mapper.prgrom, PRGROM_START, PRGROM_END);
		this.ppu.bus.connect(mapper.chrrom, CHRROM_START, CHRROM_END);
		// Map PPU VRAM + palette with proper mirroring
		const ppuMemory = new PPUMemory(cartridge.mirroring);
		this.ppu.bus.connect(ppuMemory, 0x2000, 0x3fff);

		this.cpu.reset();
	}

	reset(): void {
		this.cpu.reset();
	}

	start(): void {
		if (!this.#cartridge) throw new Error(`Can't start with no cartridge inserted.`);

		this.#animationId = requestAnimationFrame(this.#frameRequestCallback);
	}

	stop(): void {
		if (this.#animationId !== null) cancelAnimationFrame(this.#animationId);
	}

	#connectOAMADDR(): void {
		this.cpu.bus.connect(new OAMADDR(this.ppu), {
			end: PPU_END,
			start: OAMADDR_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectOAMDATA(): void {
		this.cpu.bus.connect(new OAMDATA(this.ppu), {
			end: PPU_END,
			start: OAMDATA_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectOAMDMA(): void {
		this.cpu.bus.connect(new OAMDMA(this.cpu, this.ppu), OAMDMA_ADDRESS);
	}

	#connectPPU(): void {
		this.#connectPPUCTRL();
		this.#connectPPUMASK();
		this.#connectPPUSTATUS();
		this.#connectOAMADDR();
		this.#connectOAMDATA();
		this.#connectPPUSCROLL();
		this.#connectPPUADDR();
		this.#connectPPUDATA();
	}

	#connectPPUADDR(): void {
		this.cpu.bus.connect(new PPUADDR(this.ppu), {
			end: PPU_END,
			start: PPUADDR_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectPPUCTRL(): void {
		this.cpu.bus.connect(new PPUCTRL(this.ppu), {
			end: PPU_END,
			start: PPUCTRL_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectPPUDATA(): void {
		this.cpu.bus.connect(new PPUDATA(this.ppu), {
			end: PPU_END,
			start: PPUDATA_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectPPUMASK(): void {
		this.cpu.bus.connect(new PPUMASK(this.ppu), {
			end: PPU_END,
			start: PPUMASK_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectPPUSCROLL(): void {
		this.cpu.bus.connect(new PPUSCROLL(this.ppu), {
			end: PPU_END,
			start: PPUSCROLL_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectPPUSTATUS(): void {
		this.cpu.bus.connect(new PPUSTATUS(this.ppu), {
			end: PPU_END,
			start: PPUSTATUS_START,
			step: PPU_REGISTER_COUNT,
		});
	}

	#connectRAM(): void {
		this.cpu.bus.connect(this.ram, RAM_START, RAM_END);
	}

	#onFrameRequest(timestamp: number): void {
		if (!this.#lastFrameTimestamp) this.#lastFrameTimestamp = timestamp;

		if (timestamp - this.#lastFrameTimestamp >= (1 * 1000) / 60) {
			const { frame } = this.ppu;

			for (let cycle = 0; cycle < MAX_FRAME_CYCLES && frame === this.ppu.frame; cycle++) {
				for (let index = 0; index < 3 * this.cpu.cycles; index++) this.ppu.step();

				this.cpu.step();
			}
		}

		this.#animationId = requestAnimationFrame(this.#frameRequestCallback);
		this.#lastFrameTimestamp = timestamp;
	}
}

export default Machine;
