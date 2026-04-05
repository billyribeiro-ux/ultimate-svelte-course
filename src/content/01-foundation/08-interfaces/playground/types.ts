export interface User {
	readonly id: string;
	name: string;
	role: 'admin' | 'member';
	avatar?: string;
	bio?: string;
}
