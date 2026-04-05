/**
 * ApiError — a named Error subtype for HTTP failures.
 *
 * Carries the HTTP status and the offending URL so callers can render
 * a helpful message and decide whether retrying is worthwhile.
 */
export class ApiError extends Error {
	readonly status: number;
	readonly url: string;

	constructor(status: number, url: string, message?: string) {
		super(message ?? `Request to ${url} failed with status ${status}`);
		this.name = 'ApiError';
		this.status = status;
		this.url = url;
	}

	get retriable(): boolean {
		return this.status >= 500 || this.status === 0;
	}
}
