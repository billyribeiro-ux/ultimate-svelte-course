import { ApiError } from '../../09-error-handling/playground/errors';

/**
 * getJson — generic JSON fetch wrapper.
 *
 * Pushes the resolved type up to the caller so every call site gets
 * precise typing without any explicit casting at consumption.
 */
export async function getJson<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (!res.ok) {
		throw new ApiError(res.status, url);
	}
	// Boundary assertion: JSON parsing returns unknown; we commit to T here
	// so downstream code can consume it as the declared type.
	return (await res.json()) as T;
}

/**
 * simulateJson — deterministic fake fetch used by demos so the lesson
 * runs without a real backend. Accepts a typed payload and returns a
 * Promise<T> that resolves after a short delay.
 */
export function simulateJson<T>(payload: T, ms: number = 600): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(payload), ms);
	});
}
