/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import Bus from '../Bus';
import {
	BREAK_FLAG_MASK,
	CARRY_FLAG_MASK,
	DECIMAL_FLAG_MASK,
	INTERRUPT_FLAG_MASK,
	NEGATIVE_FLAG_MASK,
	OVERFLOW_FLAG_MASK,
	UNUSED_FLAG_MASK,
	ZERO_FLAG_MASK,
} from './flags';
import INSTRUCTIONS from './instructions';

const STACK_OFFSET = 0x0100;

const RESET_LOW_WORD = 0xfffc;
const RESET_HIGH_WORD = 0xfffd;

/**
 * 6502 CPU core emulation. Holds registers, flags, program counter,
 * executes instructions by fetching opcodes and delegating to the
 * instruction table with appropriate addressing modes.
 *
 * @public
 */
class CPU {
	/** Accumulator (A) register. */
	accumulator = 0;

	/** Break flag (B). */
	break = false;

	/** System bus providing memory‑mapped I/O for CPU reads/writes. */
	readonly bus = new Bus();

	/** Carry flag (C). */
	carry = false;

	/** Cycle counter incremented during instruction execution. */
	cycles = 0;

	/** Decimal mode flag (D). Not used by NES CPU but maintained. */
	decimal = false;

	/** Interrupt disable flag (I). */
	interrupt = false;

	/** Negative flag (N). */
	negative = false;

	/** Overflow flag (V). */
	overflow = false;

	/** 16‑bit program counter. */
	programCounter = 0;

	/** 8‑bit stack pointer (offset within page $0100). */
	stackPointer = 0xff;

	/** Index register X. */
	x = 0;

	/** Index register Y. */
	y = 0;

	/** Zero flag (Z). */
	zero = false;

	/** Packed processor status (NV-BDIZC). */
	get processorStatus(): number {
		return (
			(this.negative ? NEGATIVE_FLAG_MASK : 0) |
			(this.overflow ? OVERFLOW_FLAG_MASK : 0) |
			UNUSED_FLAG_MASK |
			(this.break ? BREAK_FLAG_MASK : 0) |
			(this.decimal ? DECIMAL_FLAG_MASK : 0) |
			(this.interrupt ? INTERRUPT_FLAG_MASK : 0) |
			(this.zero ? ZERO_FLAG_MASK : 0) |
			(this.carry ? CARRY_FLAG_MASK : 0)
		);
	}

	set processorStatus(value: number) {
		this.negative = !!(value & NEGATIVE_FLAG_MASK);
		this.overflow = !!(value & OVERFLOW_FLAG_MASK);
		this.break = !!(value & BREAK_FLAG_MASK);
		this.decimal = !!(value & DECIMAL_FLAG_MASK);
		this.interrupt = !!(value & INTERRUPT_FLAG_MASK);
		this.zero = !!(value & ZERO_FLAG_MASK);
		this.carry = !!(value & CARRY_FLAG_MASK);
	}

	/** High byte of the program counter. */
	get programCounterHighWord(): number {
		return this.programCounter >> 8;
	}

	set programCounterHighWord(value: number) {
		this.programCounter = (value << 8) | (this.programCounter & 0xff);
	}

	/** Low byte of the program counter. */
	get programCounterLowWord(): number {
		return this.programCounter & 0xff;
	}

	set programCounterLowWord(value: number) {
		this.programCounter = (this.programCounter & 0xff00) | (value & 0xff);
	}

	/** Top value on the stack (page $0100 | SP). */
	get stackTop(): number {
		return this.bus.read(STACK_OFFSET | this.stackPointer);
	}

	set stackTop(value: number) {
		this.bus.write(STACK_OFFSET | this.stackPointer, value);
	}

	/**
	 * Non-maskable interrupt. Pushes PC and status to stack and jumps to NMI vector.
	 */
	nmi(): void {
		// Push PC high then low
		this.bus.write(STACK_OFFSET | this.stackPointer--, this.programCounterHighWord);
		this.bus.write(STACK_OFFSET | this.stackPointer--, this.programCounterLowWord);
		// Push processor status with B flag cleared, bit 5 set
		const flags = this.processorStatus & ~BREAK_FLAG_MASK;
		this.bus.write(STACK_OFFSET | this.stackPointer--, flags);
		// Set Interrupt Disable
		this.interrupt = true;
		// Load NMI vector ($FFFA/B)
		this.programCounter = this.bus.read(0xfffa) | (this.bus.read(0xfffb) << 8);
		// NMI takes 7 cycles on 6502
		this.cycles += 7;
	}

	/** Performs CPU reset sequence and loads the reset vector into PC. */
	reset(): void {
		this.accumulator = 0;
		this.x = 0;
		this.y = 0;
		this.stackPointer = 0xfd;
		this.processorStatus = 0x24;
		this.programCounter = this.bus.read(RESET_LOW_WORD) | (this.bus.read(RESET_HIGH_WORD) << 8);

		this.cycles += 7;
	}

	/** Executes a single fetch‑decode‑execute step for the current opcode. */
	step(): void {
		this.cycles = 0;

		const opcode = this.bus.read(this.programCounter++);
		const { addressing, cycles, extraCycles, operation } =
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			INSTRUCTIONS[opcode]!;

		operation(this, addressing, extraCycles);

		this.cycles += cycles ?? 0;
	}
}

export default CPU;
