/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

/**
 * An address range for a connected device.
 *
 * @public
 */
export interface AddressRange {
	/**
	 * The end of address range.
	 */
	end?: number;

	/**
	 * The start of address range.
	 */
	start: number;

	/**
	 * The step of address inside of the address range.
	 */
	step?: number;
}

/**
 * A generalized representation of a device on the bus.
 * Can be read-only, write-only, or both at the same time.
 *
 * @public
 */
export interface Device extends Partial<ReadOnlyDevice>, Partial<WriteOnlyDevice> {}

/**
 * A read-only device on the bus, like ROM.
 *
 * @public
 */
export interface ReadOnlyDevice {
	/**
	 * Returns the data at an address.
	 *
	 * @param address - The address.
	 * @returns The data value.
	 */
	read: (address: number) => number;
}

/**
 * A write-only device on the bus, like some PPU registers.
 * @see {@link https://www.nesdev.org/wiki/PPU_registers} for more about PPU registers.
 *
 * @public
 */
export interface WriteOnlyDevice {
	/**
	 * Writes data to an address.
	 *
	 * @param data - The data value.
	 * @param address - The address.
	 */
	write: (data: number, address: number) => void;
}

/**
 * A programmatic implementation of the memory bus.
 * Connects different devices that share the same address space.
 *
 * @public
 */
class Bus {
	/**
	 * The last value present on the bus.
	 * Models the open-bus behavior.
	 */
	lastOnTheBus = 0;

	readonly #deviceMap = new Map<number, Device>();

	/**
	 * Connects a device to the bus at a single address.
	 *
	 * @param device - The device to connect.
	 * @param start - The start address of the range.
	 * @param end - The end address of the range.
	 *
	 * @internal
	 */
	connect(device: Device, start: number, end?: number): void;
	/**
	 * Connects a device to the bus over a range of addresses, with an optional step.
	 *
	 * @param device - The device to connect.
	 * @param range - The address range.
	 *
	 * @internal
	 */
	connect(device: Device, range: AddressRange): void;
	connect(device: Device, startOrRange: AddressRange | number, end?: number): void {
		const start = typeof startOrRange === 'number' ? startOrRange : startOrRange.start;
		const endOrRange = typeof startOrRange === 'object' ? startOrRange.end : end;
		const step = typeof startOrRange === 'object' ? (startOrRange.step ?? 1) : 1;

		for (let address = start; address <= (endOrRange ?? start); address += step) {
			const connected = this.#deviceMap.get(address);

			if (connected && connected !== device) {
				throw new Error(
					`Can't connect device at address ${address.toString(16)}. The address already has another device connected.`,
				);
			}

			this.#deviceMap.set(address, device);
		}
	}

	/**
	 * Returns the data at the address, or the last value on the bus.
	 *
	 * @param address - The address.
	 * @returns The data value at the address, or the last value on the bus.
	 */
	read(address: number): number {
		const data = this.#deviceMap.get(address)?.read?.(address) ?? this.lastOnTheBus;
		this.lastOnTheBus = data;
		return data;
	}

	/**
	 * Writes data to the address.
	 *
	 * @param address - The address.
	 * @param data - The data value.
	 */
	write(address: number, data: number): void {
		this.lastOnTheBus = data;
		this.#deviceMap.get(address)?.write?.(data, address);
	}
}

export default Bus;
