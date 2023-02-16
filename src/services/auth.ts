import * as Utils from '../utils/utils'

/**
 * 1. post login form, wait for response, dispath and refresh
 * 2. store token in secure store
 * 3. get token from secure store
 * 4. Decode jwt and return id, email
 * 5. get user avatar url, name from server (jwt)
 * 6. Logout, clean secure store, dispatch
 * 7. signup, wait for response, redirect
 */

type signupReturn = {
    status: boolean,
    msg: string,
}

type userData = {
    id: number,
    email: string,
    name: string,
    token: string,
}

type loginReturn = {
    status: boolean,
    msg: string,
    data: undefined | userData,
}

type jwtDecodedToken = {
    id: number,
    email: string,
    iat: number, // Timestamp in millsecond
    exp: number, // Timestamp in millsecond
}

