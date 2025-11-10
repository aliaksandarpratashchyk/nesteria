/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * SEt Interrupt disable
 *
 * Sets the interrupt disable flag.
 *
 * @param cpu - CPU
 */
function sei(cpu: CPU): void {
	cpu.interrupt = true;
}

export default sei;
