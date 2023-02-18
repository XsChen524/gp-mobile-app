export type jwtDecodedTokenType = {
    id: number;
    email: string;
    iat: number; // Timestamp in millsecond
    exp: number; // Timestamp in millsecond
};

export type signupReturn = {
    status: boolean,
    msg: string,
}

export type userData = {
    id: number,
    email: string,
    name: string,
    token: string,
}

export type loginReturn = {
    status: boolean,
    msg: string,
    data: undefined | userData,
}
