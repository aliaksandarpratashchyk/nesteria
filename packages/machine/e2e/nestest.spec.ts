/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import ines from '../src/cartridges/ines';
import Machine from '../src/Machine';

const NESTEST_LOG_REGEX =
	/^(?<pc>[0-9A-F]{4})[^:]+:(?<a>[0-9A-F]{2})\sX:(?<x>[0-9A-F]{2})\sY:(?<y>[0-9A-F]{2})\sP:(?<p>[0-9A-F]{2})\sSP:(?<sp>[0-9A-F]{2})\sPPU:\s*[0-9]+,\s*[0-9]+\sCYC:(?<cycles>[0-9]+)$/u;

/**
 * Verifies CPU state against the authoritative NESTEST log on each step.
 */
describe('nestest', () => {
	it('should pass nestest.', () => {
		const machine = new Machine();
		machine.insert(ines(new Uint8Array(readFileSync(resolve(__dirname, './nestest.nes')))));
		machine.cpu.programCounter = 0xc000;

		const log = readFileSync(resolve(__dirname, './nestest.log'), {
			encoding: 'utf-8',
		}).replace(/\r\n?/g, '\n').split('\n');					

		let totalCycles = machine.cpu.cycles;

		for (let index = 0; index < 8960; index++) {							
			// eslint-disable-next-line id-length
			const { a, cycles, p, pc, sp, x, y } = NESTEST_LOG_REGEX.exec(log[index] ?? '')?.groups ?? {};

			expect(machine.cpu.programCounter).toBe(Number.parseInt(pc ?? '', 16));
			expect(machine.cpu.accumulator).toBe(Number.parseInt(a ?? '', 16));
			expect(machine.cpu.x).toBe(Number.parseInt(x ?? '', 16));
			expect(machine.cpu.y).toBe(Number.parseInt(y ?? '', 16));
			expect(machine.cpu.processorStatus).toBe(Number.parseInt(p ?? '', 16));
			expect(machine.cpu.stackPointer).toBe(Number.parseInt(sp ?? '', 16));
			expect(totalCycles).toBe(Number.parseInt(cycles ?? '', 10));

			machine.cpu.step();
			totalCycles += machine.cpu.cycles;

			console.log(`Line #${index + 1} "${log[index]}" passed.`);
		}
	});
});
