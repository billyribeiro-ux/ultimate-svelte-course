/**
 * Typed higher-order debounce helper.
 *
 * Returns a wrapped function that delays invocation of `fn` until `ms`
 * milliseconds have elapsed since the last call. Preserves the original
 * parameter types through the generic `T`.
 *
 * Call the returned `.cancel()` method to clear any pending timer — useful
 * from a component `$effect` cleanup to avoid late fires after unmount.
 */
export interface Debounced<T extends (...a: never[]) => void> {
	(...args: Parameters<T>): void;
	cancel(): void;
}

export function debounce<T extends (...a: never[]) => void>(fn: T, ms: number): Debounced<T> {
	let id: ReturnType<typeof setTimeout> | undefined;

	const wrapped = ((...args: Parameters<T>): void => {
		if (id !== undefined) clearTimeout(id);
		id = setTimeout(() => {
			id = undefined;
			fn(...(args as unknown as never[]));
		}, ms);
	}) as Debounced<T>;

	wrapped.cancel = (): void => {
		if (id !== undefined) {
			clearTimeout(id);
			id = undefined;
		}
	};

	return wrapped;
}
