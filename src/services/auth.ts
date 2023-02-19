import config from '../config/config';
import { NativeSignupForm, EggSignupReturn, SignUpReturn } from '.';
import { parseUrlEncodedBody } from '../utils/utils';

/**
 * 1. post login form, wait for response, dispath and refresh
 * 2. store token in secure store
 * 3. get token from secure store
 * 4. Decode jwt and return id, email
 * 5. get user avatar url, name from server (jwt)
 * 6. Logout, clean secure store, dispatch
 * 7. signup, wait for response, redirect
 */

/**
 * Async function for posting signup form to server and wait for response
 * @param {NativeSignupForm} form 
 * @returns {Promise<SignUpReturn>}
 */
export const postSignupForm = async (form: NativeSignupForm): Promise<SignUpReturn> => {

	let requestBody = parseUrlEncodedBody<NativeSignupForm>(form);

	let response = await fetch(config.env.pro + config.url.auth.signup, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: requestBody,
	});

	let data: EggSignupReturn = await response.json();

	let signupReturn = {
		status: response.status,
		responseBody: data,
	};

	return signupReturn;

};
