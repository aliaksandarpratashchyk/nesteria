/**
 * Generates an array of random bytes.
 *
 * @param count - The size of array.
 * @returns - The array of random bytes.
 */
function bytes(count: number): number[] {
	const array = [];

	for (let index = 0; index < count; index++) array.push((Math.random() * 0xff) & 0xff);

	return array;
}

export default bytes;
