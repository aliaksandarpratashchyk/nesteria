/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/* eslint max-lines: "off" */

import absolute from './addressingModes/absolute';
import absoluteX from './addressingModes/absoluteX';
import absoluteY from './addressingModes/absoluteY';
import accumulator from './addressingModes/accumulator';
import immediate from './addressingModes/immediate';
import implied from './addressingModes/implied';
import indexedX from './addressingModes/indexedX';
import indirect from './addressingModes/indirect';
import indirectY from './addressingModes/indirectY';
import memory from './addressingModes/memory';
import relative from './addressingModes/relative';
import zeroPage from './addressingModes/zeroPage';
import zeroPageX from './addressingModes/zeroPageX';
import zeroPageY from './addressingModes/zeroPageY';
import { instruction, type InstructionDescriptor } from './InstructionDescriptor';
import { addressOnly, dataOnly, full } from './Operation';
import adc from './operations/adc';
import ahx from './operations/ahx';
import alr from './operations/alr';
import anc from './operations/anc';
import and from './operations/and';
import asl from './operations/asl';
import axs from './operations/axs';
import bcc from './operations/bcc';
import bcs from './operations/bcs';
import beq from './operations/beq';
import bit from './operations/bit';
import bmi from './operations/bmi';
import bne from './operations/bne';
import bpl from './operations/bpl';
import brk from './operations/brk';
import bvc from './operations/bvc';
import bvs from './operations/bvs';
import clc from './operations/clc';
import cld from './operations/cld';
import cli from './operations/cli';
import clv from './operations/clv';
import cmp from './operations/cmp';
import cpx from './operations/cpx';
import cpy from './operations/cpy';
import dcp from './operations/dcp';
import dec from './operations/dec';
import dex from './operations/dex';
import dey from './operations/dey';
import eor from './operations/eor';
import inc from './operations/inc';
import inx from './operations/inx';
import iny from './operations/iny';
import isb from './operations/isb';
import jmp from './operations/jmp';
import jsr from './operations/jsr';
import kil from './operations/kil';
import las from './operations/las';
import lax from './operations/lax';
import lda from './operations/lda';
import ldx from './operations/ldx';
import ldy from './operations/ldy';
import lsr from './operations/lsr';
import nop from './operations/nop';
import ora from './operations/ora';
import pha from './operations/pha';
import php from './operations/php';
import pla from './operations/pla';
import plp from './operations/plp';
import rla from './operations/rla';
import rol from './operations/rol';
import ror from './operations/ror';
import rra from './operations/rra';
import rti from './operations/rti';
import rts from './operations/rts';
import sax from './operations/sax';
import sbc from './operations/sbc';
import sec from './operations/sec';
import sed from './operations/sed';
import sei from './operations/sei';
import sha from './operations/sha';
import shx from './operations/shx';
import shy from './operations/shy';
import slo from './operations/slo';
import sre from './operations/sre';
import sta from './operations/sta';
import stx from './operations/stx';
import sty from './operations/sty';
import tas from './operations/tas';
import tax from './operations/tax';
import tay from './operations/tay';
import tsx from './operations/tsx';
import txa from './operations/txa';
import txs from './operations/txs';
import tya from './operations/tya';
import xaa from './operations/xaa';

const INSTRUCTIONS: InstructionDescriptor[] = [
	// 0x00
	instruction(brk, implied, 7),
	instruction(dataOnly(ora), memory(indexedX), 6),
	instruction(kil, implied), // Illegal
	instruction(full(slo), memory(indexedX), 8), // Illegal

	// 0x04
	instruction(addressOnly(nop), memory(zeroPage), 3), // Illegal
	instruction(dataOnly(ora), memory(zeroPage), 3),
	instruction(full(asl), memory(zeroPage), 5),
	instruction(full(slo), memory(zeroPage), 5), // Illegal

	// 0x08
	instruction(php, implied, 3),
	instruction(dataOnly(ora), immediate, 2),
	instruction(full(asl), accumulator, 2),
	instruction(dataOnly(anc), immediate, 2), // Illegal

	// 0x0C
	instruction(addressOnly(nop), memory(absolute), 4), // Illegal
	instruction(dataOnly(ora), memory(absolute), 4),
	instruction(full(asl), memory(absolute), 6),
	instruction(full(slo), memory(absolute), 6), // Illegal

	// 0x10
	instruction(addressOnly(bpl), relative, 2),
	instruction(dataOnly(ora), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(full(slo), memory(indirectY), 8), // Illegal

	// 0x14
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(ora), memory(zeroPageX), 4),
	instruction(full(asl), memory(zeroPageX), 6),
	instruction(full(slo), memory(zeroPageX), 6), // Illegal

	// 0x18
	instruction(clc, implied, 2),
	instruction(dataOnly(ora), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2), // Illegal
	instruction(full(slo), memory(absoluteY), 7), // Illegal

	// 0x1C
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(ora), memory(absoluteX), 4, 1),
	instruction(full(asl), memory(absoluteX), 7),
	instruction(full(slo), memory(absoluteX), 7), // Illegal

	// 0x20
	instruction(addressOnly(jsr), memory(absolute), 6),
	instruction(dataOnly(and), memory(indexedX), 6),
	instruction(kil, implied), // Illegal
	instruction(full(rla), memory(indexedX), 8), // Illegal

	// 0x24
	instruction(dataOnly(bit), memory(zeroPage), 3),
	instruction(dataOnly(and), memory(zeroPage), 3),
	instruction(full(rol), memory(zeroPage), 5),
	instruction(full(rla), memory(zeroPage), 5), // Illegal

	// 0x28
	instruction(plp, implied, 4),
	instruction(dataOnly(and), immediate, 2),
	instruction(full(rol), accumulator, 2),
	instruction(dataOnly(anc), immediate, 2), // Illegal

	// 0x2C
	instruction(dataOnly(bit), memory(absolute), 4),
	instruction(dataOnly(and), memory(absolute), 4),
	instruction(full(rol), memory(absolute), 6),
	instruction(full(rla), memory(absolute), 6), // Illegal

	// 0x30
	instruction(addressOnly(bmi), relative, 2),
	instruction(dataOnly(and), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(full(rla), memory(indirectY), 8), // Illegal

	// 0x34
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(and), memory(zeroPageX), 4),
	instruction(full(rol), memory(zeroPageX), 6),
	instruction(full(rla), memory(zeroPageX), 6), // Illegal

	// 0x38
	instruction(sec, implied, 2),
	instruction(dataOnly(and), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2), // Illegal
	instruction(full(rla), memory(absoluteY), 7), // Illegal

	// 0x3C
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(and), memory(absoluteX), 4, 1),
	instruction(full(rol), memory(absoluteX), 7),
	instruction(full(rla), memory(absoluteX), 7), // Illegal

	// 0x40
	instruction(rti, implied, 6),
	instruction(dataOnly(eor), memory(indexedX), 6),
	instruction(kil, implied), // Illegal
	instruction(full(sre), memory(indexedX), 8), // Illegal

	// 0x44
	instruction(addressOnly(nop), memory(zeroPage), 3),
	instruction(dataOnly(eor), memory(zeroPage), 3),
	instruction(full(lsr), memory(zeroPage), 5),
	instruction(full(sre), memory(zeroPage), 5), // Illegal

	// 0x48
	instruction(pha, implied, 3),
	instruction(dataOnly(eor), immediate, 2),
	instruction(full(lsr), accumulator, 2),
	instruction(dataOnly(alr), immediate, 2), // Illegal

	// 0x4C
	instruction(addressOnly(jmp), memory(absolute), 3),
	instruction(dataOnly(eor), memory(absolute), 4),
	instruction(full(lsr), memory(absolute), 6),
	instruction(full(sre), memory(absolute), 6), // Illegal

	// 0x50
	instruction(addressOnly(bvc), relative, 2),
	instruction(dataOnly(eor), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(full(sre), memory(indirectY), 8), // Illegal

	// 0x54
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(eor), memory(zeroPageX), 4),
	instruction(full(lsr), memory(zeroPageX), 6),
	instruction(full(sre), memory(zeroPageX), 6), // Illegal

	// 0x58
	instruction(cli, implied, 2),
	instruction(dataOnly(eor), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2), // Illegal
	instruction(full(sre), memory(absoluteY), 7), // Illegal

	// 0x5C
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(eor), memory(absoluteX), 4, 1),
	instruction(full(lsr), memory(absoluteX), 7),
	instruction(full(sre), memory(absoluteX), 7), // Illegal

	// 0x60
	instruction(rts, implied, 6),
	instruction(dataOnly(adc), memory(indexedX), 6),
	instruction(kil, implied), // Illegal
	instruction(full(rra), memory(indexedX), 8), // Illegal

	// 0x64
	instruction(addressOnly(nop), memory(zeroPage), 3), // Illegal
	instruction(dataOnly(adc), memory(zeroPage), 3),
	instruction(full(ror), memory(zeroPage), 5),
	instruction(full(rra), memory(zeroPage), 5), // Illegal

	// 0x68
	instruction(pla, implied, 4),
	instruction(dataOnly(adc), immediate, 2),
	instruction(full(ror), accumulator, 2),
	instruction(full(rra), immediate, 2), // Illegal

	// 0x6C
	instruction(addressOnly(jmp), memory(indirect), 5),
	instruction(dataOnly(adc), memory(absolute), 4),
	instruction(full(ror), memory(absolute), 6),
	instruction(full(rra), memory(absolute), 6), // Illegal

	// 0x70
	instruction(addressOnly(bvs), relative, 2),
	instruction(dataOnly(adc), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(full(rra), memory(indirectY), 8), // Illegal

	// 0x74
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(adc), memory(zeroPageX), 4),
	instruction(full(ror), memory(zeroPageX), 6),
	instruction(full(rra), memory(zeroPageX), 6), // Illegal

	// 0x78
	instruction(sei, implied, 2),
	instruction(dataOnly(adc), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2), // Illegal
	instruction(full(rra), memory(absoluteY), 7), // Illegal

	// 0x7C
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(adc), memory(absoluteX), 4, 1),
	instruction(full(ror), memory(absoluteX), 7),
	instruction(full(rra), memory(absoluteX), 7), // Illegal

	// 0x80
	instruction(full(nop), immediate, 2), // Illegal
	instruction(addressOnly(sta), memory(indexedX), 6),
	instruction(full(nop), immediate, 2), // Illegal
	instruction(addressOnly(sax), memory(indexedX), 6), // Illegal

	// 0x84
	instruction(addressOnly(sty), memory(zeroPage), 3),
	instruction(addressOnly(sta), memory(zeroPage), 3),
	instruction(addressOnly(stx), memory(zeroPage), 3),
	instruction(addressOnly(sax), memory(zeroPage), 3), // Illegal

	// 0x88
	instruction(dey, implied, 2),
	instruction(addressOnly(nop), immediate, 2), // Illegal
	instruction(txa, implied, 2),
	instruction(dataOnly(xaa), immediate, 2), // Illegal

	// 0x8C
	instruction(addressOnly(sty), memory(absolute), 4),
	instruction(addressOnly(sta), memory(absolute), 4),
	instruction(addressOnly(stx), memory(absolute), 4),
	instruction(addressOnly(sax), memory(absolute), 4), // Illegal

	// 0x90
	instruction(addressOnly(bcc), relative, 2),
	instruction(addressOnly(sta), memory(indirectY), 6),
	instruction(kil, implied), // Illegal
	instruction(addressOnly(sha), memory(indirectY), 6), // Illegal

	// 0x94
	instruction(addressOnly(sty), memory(zeroPageX), 4),
	instruction(addressOnly(sta), memory(zeroPageX), 4),
	instruction(addressOnly(stx), memory(zeroPageY), 4),
	instruction(addressOnly(sax), memory(zeroPageY), 4), // Illegal

	// 0x98
	instruction(tya, implied, 2),
	instruction(addressOnly(sta), memory(absoluteY), 5),
	instruction(txs, implied, 2),
	instruction(addressOnly(tas), memory(absoluteY), 5), // Illegal

	// 0x9C
	instruction(addressOnly(shy), memory(absoluteX), 5), // Illegal
	instruction(addressOnly(sta), memory(absoluteX), 5),
	instruction(addressOnly(shx), memory(absoluteY), 5), // Illegal
	instruction(addressOnly(ahx), memory(absoluteY), 5), // Illegal

	// 0xA0
	instruction(dataOnly(ldy), immediate, 2),
	instruction(dataOnly(lda), memory(indexedX), 6),
	instruction(dataOnly(ldx), immediate, 2),
	instruction(dataOnly(lax), memory(indexedX), 6), // Illegal

	// 0xA4
	instruction(dataOnly(ldy), memory(zeroPage), 3),
	instruction(dataOnly(lda), memory(zeroPage), 3),
	instruction(dataOnly(ldx), memory(zeroPage), 3),
	instruction(dataOnly(lax), memory(zeroPage), 3), // Illegal

	// 0xA8
	instruction(tay, implied, 2),
	instruction(dataOnly(lda), immediate, 2),
	instruction(tax, implied, 2),
	instruction(dataOnly(lax), immediate, 2), // Illegal

	// 0xAC
	instruction(dataOnly(ldy), memory(absolute), 4),
	instruction(dataOnly(lda), memory(absolute), 4),
	instruction(dataOnly(ldx), memory(absolute), 4),
	instruction(dataOnly(lax), memory(absolute), 4), // Illegal

	// 0xB0
	instruction(addressOnly(bcs), relative, 2),
	instruction(dataOnly(lda), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(dataOnly(lax), memory(indirectY), 5, 1), // Illegal

	// 0xB4
	instruction(dataOnly(ldy), memory(zeroPageX), 4),
	instruction(dataOnly(lda), memory(zeroPageX), 4),
	instruction(dataOnly(ldx), memory(zeroPageY), 4),
	instruction(dataOnly(lax), memory(zeroPageY), 4), // Illegal

	// 0xB8
	instruction(clv, implied, 2),
	instruction(dataOnly(lda), memory(absoluteY), 4, 1),
	instruction(tsx, implied, 2),
	instruction(dataOnly(las), memory(absoluteY), 4, 1), // Illegal

	// 0xBC
	instruction(dataOnly(ldy), memory(absoluteX), 4, 1),
	instruction(dataOnly(lda), memory(absoluteX), 4, 1),
	instruction(dataOnly(ldx), memory(absoluteY), 4, 1),
	instruction(dataOnly(lax), memory(absoluteY), 4, 1), // Illegal

	// 0xC0
	instruction(dataOnly(cpy), immediate, 2),
	instruction(dataOnly(cmp), memory(indexedX), 6),
	instruction(full(nop), immediate, 2), // Illegal
	instruction(full(dcp), memory(indexedX), 8), // Illegal

	// 0xC4
	instruction(dataOnly(cpy), memory(zeroPage), 3),
	instruction(dataOnly(cmp), memory(zeroPage), 3),
	instruction(full(dec), memory(zeroPage), 5),
	instruction(full(dcp), memory(zeroPage), 5), // Illegal

	// 0xC8
	instruction(iny, implied, 2),
	instruction(dataOnly(cmp), immediate, 2),
	instruction(dex, implied, 2),
	instruction(dataOnly(axs), immediate, 2), // Illegal

	// 0xCC
	instruction(dataOnly(cpy), memory(absolute), 4),
	instruction(dataOnly(cmp), memory(absolute), 4),
	instruction(full(dec), memory(absolute), 6),
	instruction(full(dcp), memory(absolute), 6), // Illegal

	// 0xD0
	instruction(addressOnly(bne), relative, 2),
	instruction(dataOnly(cmp), memory(indirectY), 5, 1),
	instruction(kil, implied, 2), // Illegal
	instruction(full(dcp), memory(indirectY), 8), // Illegal

	// 0xD4
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(cmp), memory(zeroPageX), 4),
	instruction(full(dec), memory(zeroPageX), 6),
	instruction(full(dcp), memory(zeroPageX), 6), // Illegal

	// 0xD8
	instruction(cld, implied, 2),
	instruction(dataOnly(cmp), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2),
	instruction(full(dcp), memory(absoluteY), 7), // Illegal

	// 0xDC
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(cmp), memory(absoluteX), 4, 1),
	instruction(full(dec), memory(absoluteX), 7),
	instruction(full(dcp), memory(absoluteX), 7), // Illegal

	// 0xE0
	instruction(dataOnly(cpx), immediate, 2),
	instruction(dataOnly(sbc), memory(indexedX), 6),
	instruction(addressOnly(nop), immediate, 2), // Illegal
	instruction(full(isb), memory(indexedX), 8), // Illegal

	// 0xE4
	instruction(dataOnly(cpx), memory(zeroPage), 3),
	instruction(dataOnly(sbc), memory(zeroPage), 3),
	instruction(full(inc), memory(zeroPage), 5),
	instruction(full(isb), memory(zeroPage), 5), // Illegal

	// 0xE8
	instruction(inx, implied, 2),
	instruction(dataOnly(sbc), immediate, 2),
	instruction(nop, implied, 2),
	instruction(dataOnly(sbc), immediate, 2), // Illegal

	// 0xEC
	instruction(dataOnly(cpx), memory(absolute), 4),
	instruction(dataOnly(sbc), memory(absolute), 4),
	instruction(full(inc), memory(absolute), 6),
	instruction(full(isb), memory(absolute), 6), // Illegal

	// 0xF0
	instruction(addressOnly(beq), relative, 2),
	instruction(dataOnly(sbc), memory(indirectY), 5, 1),
	instruction(kil, implied), // Illegal
	instruction(full(isb), memory(indirectY), 8), // Illegal

	// 0xF4
	instruction(addressOnly(nop), memory(zeroPageX), 4), // Illegal
	instruction(dataOnly(sbc), memory(zeroPageX), 4),
	instruction(full(inc), memory(zeroPageX), 6),
	instruction(full(isb), memory(zeroPageX), 6), // Illegal

	// 0xF8
	instruction(sed, implied, 2),
	instruction(dataOnly(sbc), memory(absoluteY), 4, 1),
	instruction(nop, implied, 2), // Illegal
	instruction(full(isb), memory(absoluteY), 7), // Illegal

	// 0xFC
	instruction(addressOnly(nop), memory(absoluteX), 4, 1), // Illegal
	instruction(dataOnly(sbc), memory(absoluteX), 4, 1),
	instruction(full(inc), memory(absoluteX), 7),
	instruction(full(isb), memory(absoluteX), 7), // Illegal
];

export default INSTRUCTIONS;
