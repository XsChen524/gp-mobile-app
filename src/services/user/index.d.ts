export interface User {
	id: number;
	name: string;
	email: string;
	balance: number;
	rank: number;
}

export interface UserUpdateResult {
	id: number;
	balance: number;
	rank: number;
}
