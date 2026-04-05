export interface User {
	id: string;
	name: string;
	email: string;
}

export type AsyncState =
	| { status: 'idle' }
	| { status: 'loading' }
	| { status: 'success'; data: User }
	| { status: 'error'; message: string };

export const idle: AsyncState = { status: 'idle' };
export const loading: AsyncState = { status: 'loading' };

export function success(data: User): AsyncState {
	return { status: 'success', data };
}

export function failure(message: string): AsyncState {
	return { status: 'error', message };
}

/** Exhaustive check helper — compile error if any branch is missed. */
export function assertNever(value: never): never {
	throw new Error(`Unreachable state: ${String(value)}`);
}
