import config from "../../config/config";
import {
	NativeSignupForm,
	EggSignupReturn,
	SignUpReturn,
	NativeLoginForm,
	LoginReturn,
	EggLoginReturn,
} from ".";
import { parseUrlEncodedBody } from "../../utils/utils";

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
 * @returns {Promise<SignUpReturn>} Promise of signup return, including status code and response body
 */
export const postSignupSync = async (
	form: NativeSignupForm
): Promise<SignUpReturn> => {
	let requestBody: string = parseUrlEncodedBody(form);
	let response = await fetch(config.env.pro + config.url.auth.signup, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: requestBody,
	});
	let data: EggSignupReturn = await response.json();
	let signupReturn: SignUpReturn = {
		status: response.status,
		responseBody: data,
	};
	return signupReturn;
};

/**
 * Async function for posting login form to server and wait for response
 * @param {NativeLoginForm} form
 * @returns {Promise<LoginReturn>} status code and response body object
 */
export const postLoginSync = async (
	form: NativeLoginForm
): Promise<LoginReturn> => {
	const response = await fetch(config.env.pro + config.url.auth.login, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: parseUrlEncodedBody(form),
	});
	const data: EggLoginReturn = await response.json();
	const loginReturn: LoginReturn = {
		status: response.status,
		response: data,
	};
	return loginReturn;
};
