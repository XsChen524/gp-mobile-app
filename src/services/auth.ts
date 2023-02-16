/**
 * 1. post login form
 * 2. store token in secure store
 * 3. get token from secure store
 * 4. Decode jwt and return id, email
 * 5. get user avatar url, name from server (jwt)
 */

interface signupReturn {
    status: boolean,
    msg: string,
}

interface loginData {
    id: number,
    email: string,
    token: string,
}

interface loginReturn {
    status: boolean,
    msg: string,
    data: loginData,
}

interface jwtToken {
    id: number,
    email: string,
    iat: number, // Timestamp in millsecond
    exp: number, // Timestamp in millsecond

}