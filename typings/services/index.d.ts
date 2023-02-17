export declare namespace serviceSpace {
    type jwtDecodedTokenType = {
        id: number,
        email: string,
        iat: number, // Timestamp in millsecond
        exp: number, // Timestamp in millsecond
    }
}
