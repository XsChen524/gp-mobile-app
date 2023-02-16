import * as SecureStore from 'expo-secure-store'

/**
 * 1. post login form, wait for response, dispath and refresh
 * 2. store token in secure store
 * 3. get token from secure store
 * 4. Decode jwt and return id, email
 * 5. get user avatar url, name from server (jwt)
 * 6. Logout, clean secure store, dispatch
 * 7. signup, wait for response, redirect
 */

interface signupReturn {
    status: boolean,
    msg: string,
}

interface loginData {
    id: number,
    email: string,
    name: string,
    token: string,
}

interface loginReturn {
    status: boolean,
    msg: string,
    data?: null | loginData,
}

interface jwtDecodedToken {
    id: number,
    email: string,
    iat: number, // Timestamp in millsecond
    exp: number, // Timestamp in millsecond
}

export const saveTokenToStorage = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
}

export const getTokenFromStorage = async (key: string): Promise<string> => {
  let result = await SecureStore.getItemAsync(key);
  return(result);
}