/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * CLear oVerflow
 *
 * Clears overflow flag.
 *
 * @param cpu - CPU
 */
function clv(cpu: CPU): void {
	cpu.overflow = false;
}

export default clv;
