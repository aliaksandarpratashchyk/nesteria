import { expect } from '@jest/globals';

// @ts-nocheck
// @ts-ignore: noEmit

// helper to recursively extract only fields present in `expected`
function pickMatchingFields(actual: any, expected: any): any {
	if (
		typeof expected !== 'object' ||
		expected === null ||
		typeof actual !== 'object' ||
		actual === null
	)
		return actual;

	const result: any = {};
	for (const key of Object.keys(expected)) {
		if (Object.prototype.hasOwnProperty.call(actual, key)) {
			result[key] = pickMatchingFields(actual[key], expected[key]);
		}
	}
	return result;
}

// extend Jest with the custom matcher
expect.extend({
	toMatchExpectedFields(received: any, expected: any) {
		const filtered = pickMatchingFields(received, expected);

		try {
			expect(filtered).toMatchObject(expected);
			return {
				pass: true,
				message: () => `Expected object not to match expected fields, but it did.`,
			};
		} catch (error: any) {
			return {
				pass: false,
				message: () => error.message, // re-use Jest’s diff rendering
			};
		}
	},
});

declare global {
	// declare matcher types for TypeScript
	namespace jest {
		interface Matchers<R> {
			toMatchExpectedFields(expected: any): R;
		}
	}
}
