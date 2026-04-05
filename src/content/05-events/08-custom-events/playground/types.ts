export type ToastLevel = 'info' | 'error';

export interface Toast {
	readonly id: number;
	readonly message: string;
	readonly level: ToastLevel;
}
