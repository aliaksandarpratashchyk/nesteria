/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import type CPU from '../CPU';

/**
 * SEt Decimal mode
 *
 * Sets the decimal mode flag.
 *
 * @param cpu - CPU
 */
function sed(cpu: CPU): void {
	cpu.decimal = true;
}

export default sed;
