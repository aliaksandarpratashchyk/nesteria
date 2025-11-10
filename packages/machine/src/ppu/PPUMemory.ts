/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type { Device } from '../Bus';

import NameTableMirroring from './NameTableMirroring';

/**
 * PPUMemory implements PPU VRAM + palette with proper mirroring.
 * Maps nametables according to cartridge mirroring and handles palette mirrors.
 */
class PPUMemory implements Device {
	private readonly mirroring: NameTableMirroring;
	private readonly nametable = new Uint8Array(2 * 1024);
	private readonly palette = new Uint8Array(32);

	constructor(mirroring: NameTableMirroring) {
		this.mirroring = mirroring;
	}

	read(address: number): number {
		const trimmedAddress = address & 0x3fff;

		if (trimmedAddress >= 0x2000 && trimmedAddress <= 0x3eff) {
			// Mirror $3000-$3EFF to $2000-$2EFF
			const base = trimmedAddress >= 0x3000 ? trimmedAddress - 0x1000 : trimmedAddress;
			return this.nametable[this.mapNametableAddress(base)] ?? 0;
		}

		if (trimmedAddress >= 0x3f00 && trimmedAddress <= 0x3fff) {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			const index = mapPaletteIndex(trimmedAddress);
			return this.palette[index] ?? 0;
		}

		return 0;
	}

	write(data: number, address: number): void {
		const trimmedAddress = address & 0x3fff;

		if (trimmedAddress >= 0x2000 && trimmedAddress <= 0x3eff) {
			const base = trimmedAddress >= 0x3000 ? trimmedAddress - 0x1000 : trimmedAddress;
			this.nametable[this.mapNametableAddress(base)] = data & 0xff;
			return;
		}

		if (trimmedAddress >= 0x3f00 && trimmedAddress <= 0x3fff) {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			const index = mapPaletteIndex(trimmedAddress);
			this.palette[index] = data & 0x3f;
		}
	}

	private mapNametableAddress(address: number): number {
		// Address in $2000-$2FFF
		const offset = address - 0x2000; // 0..4095
		const table = (offset >> 10) & 0x03;
		const within = offset & 0x03ff;

		let page = table & 0x01;
		switch (this.mirroring) {
			case NameTableMirroring.FourScreen:
				// Fall back to 2 KiB (no extra VRAM). Approximate by mapping
				// as vertical to keep things deterministic.
				page = table & 0x01;
				break;
			case NameTableMirroring.Horizontal:
				// [0,1] => page 0; [2,3] => page 1
				page = (table >> 1) & 0x01;
				break;
			case NameTableMirroring.Vertical:
				// [0,2] => page 0; [1,3] => page 1
				page = table & 0x01;
				break;
			default:
				break;
		}

		return (page << 10) | within; // Index into 2 KiB nametable RAM
	}
}

function mapPaletteIndex(address: number): number {
	let index = (address - 0x3f00) & 0x1f; // Mirror every 32 bytes
	// $3F10/$3F14/$3F18/$3F1C are mirrors of $3F00/$3F04/$3F08/$3F0C
	if (index & 0x10 && (index & 0x03) === 0) index &= 0x0f;
	return index;
}

export default PPUMemory;
