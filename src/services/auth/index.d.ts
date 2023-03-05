export type NativeSignupForm = {
	name: string;
	email: string;
	password: string;
};

export type EggSignupReturn = {
	status: boolean;
	msg: string;
};

export type SignUpReturn = {
	responseBody: EggSignupReturn;
	status: number;
};

export type NativeLoginForm = {
	email: string;
	password: string;
};

export type UserData = {
	id: number | undefined;
	email: string | undefined;
	name: string | undefined;
	token: string | undefined;
};

export type EggLoginReturn = {
	status: boolean;
	msg: string;
	data: undefined | UserData;
};

export type LoginReturn = {
	status: number;
	response: EggLoginReturn;
};

export type JwtDecodedTokenType = {
	id: number;
	email: string;
	iat: number; // Timestamp in millsecond
	exp: number; // Timestamp in millsecond
};
