/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * CLear Decimal
 *
 * Clears the decimal flag.
 *
 * @param cpu - CPU
 */
function cld(cpu: CPU): void {
	cpu.decimal = false;
}

export default cld;
