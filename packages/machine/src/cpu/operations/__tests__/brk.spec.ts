/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Machine, { PRGROM_END, PRGROM_START } from '../../../Machine';
import RAM from '../../../RAM';
import brk from '../brk';

/**
 * Operation semantics: BRK (Force Interrupt)
 * - Sets I flag, pushes PC+1 and P (with B set as per 6502 behavior),
 *   then sets PC from IRQ/BRK vector at $FFFE/$FFFF.
 */
describe(brk.name, () => {
	describe.each`
		p             | pc        | irqlw   | irqhw   | s0            | s1      | s2      | expectedPC
		${0b11100011} | ${0x0101} | ${0x01} | ${0x02} | ${0b11110011} | ${0x03} | ${0x01} | ${0x0201}
	`(
		'when the processor status is $p and the program counter is $pc',
		({ expectedPC, irqhw, irqlw, p, pc, s0, s1, s2 }) => {
			it(
				`should set the interrupt, ` +
					`set ${s0}, ${s1}, ${s2} on the stack ` +
					`and point program counter to ${expectedPC}.`,
				() => {
					const console = new Machine();
					console.cpu.interrupt = false;
					console.cpu.processorStatus = p;
					console.cpu.programCounter = pc;
					console.cpu.bus.connect(new RAM(PRGROM_END - PRGROM_START + 1), PRGROM_START, PRGROM_END);
					console.cpu.bus.write(0xfffe, irqlw);
					console.cpu.bus.write(0xffff, irqhw);

					brk(console.cpu);

					expect(console.cpu.interrupt).toBeTruthy();

					console.cpu.stackPointer++;
					expect(console.cpu.stackTop).toBe(s0);

					console.cpu.stackPointer++;
					expect(console.cpu.stackTop).toBe(s1);

					console.cpu.stackPointer++;
					expect(console.cpu.stackTop).toBe(s2);

					expect(console.cpu.programCounter).toBe(expectedPC);
				},
			);
		},
	);
});
