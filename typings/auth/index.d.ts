declare namespace authSpace {
    type jwtDecodedToken = {
        id: number,
        email: string,
        iat: number, // Timestamp in millsecond
        exp: number, // Timestamp in millsecond
    }
}