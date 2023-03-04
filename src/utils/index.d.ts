export type StringfyedUserData = {
	[userId: string]: string | null;
	[userEmail: string]: string | null;
	[userName: string]: string | null;
	[userToken: string]: string | null;
};

export type UserData = {
	userId: number | undefined;
	userEmail: string | undefined;
	userName: string | undefined;
	userToken: string | undefined;
};
