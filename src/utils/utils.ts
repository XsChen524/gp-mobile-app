import * as SecureStore from "expo-secure-store";
import { StringfyedUserData, UserData } from ".";

/**
 * Determine if the key is one of keys in object
 * @param key
 * @param object
 * @returns boolean
 */
const isValidKey = (
	key: string | number | symbol,
	object: object
): key is keyof typeof object => {
	return key in object;
};

/**
 * Save user data to Android secure storage by its key.
 * @param {UserData} data
 * @returns {boolean} true if store successfully
 */
export const saveUserDataToStorage = (data: UserData): boolean => {
	const stringfyedUserData: StringfyedUserData = {
		userId: data.userId ? data.userId?.toString() : null,
		userName: data.userName ? data.userName : null,
		userEmail: data.userEmail ? data.userEmail : null,
		userToken: data.userToken ? data.userToken : null,
	};

	try {
		Object.keys(stringfyedUserData).forEach(async (key) => {
			await SecureStore.setItemAsync(
				key,
				stringfyedUserData[key] as string
			);
		});
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

/**
 * Get value from Android secure storage by its key.
 * @returns {Promise<string>} Get a string value by resolving the promise.
 */
export const getUserDataFromStorage = async (): Promise<UserData> => {
	const isNull = (value: string | null): boolean => {
		if (value == null) return true;
		else return false;
	};

	let userObj: StringfyedUserData = {
		userId: null,
		userEmail: null,
		userName: null,
		userToken: null,
	};

	const keys = Object.keys(userObj);
	for (let m = 0; m < keys.length; m += 1) {
		if (isValidKey(keys[m], userObj)) {
			userObj[keys[m]] = await SecureStore.getItemAsync(keys[m]);
		}
	}
	let returnObj: UserData = {
		userId: !Number.isNaN(Number(userObj.userId))
			? Number(userObj.userId)
			: undefined,
		userEmail: isNull(userObj.userEmail)
			? undefined
			: userObj.userEmail?.toString(),
		userName: isNull(userObj.userName)
			? undefined
			: userObj.userName?.toString(),
		userToken: isNull(userObj.userToken)
			? undefined
			: userObj.userToken?.toString(),
	};
	return returnObj;
};

export const deleteUserDataFromStorage = async (): Promise<boolean> => {
	const userObj: StringfyedUserData = {
		userId: null,
		userEmail: null,
		userName: null,
		userToken: null,
	};

	try {
		Object.keys(userObj).forEach(async (key) => {
			await SecureStore.deleteItemAsync(key);
		});
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

/**
 * Parse the object of request body into UrlEncoded string
 * @param {Object} obj Object of type T
 * @returns {string} x-www-form-urlencoded request body
 */
export const parseUrlEncodedBody = (obj: Object): string => {
	let requestParams: string[] = new Array<string>();
	Object.keys(obj).forEach((key) => {
		if (isValidKey(key, obj)) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(obj[key]);
			requestParams.push(encodedKey + "=" + encodedValue);
		}
	});
	let requestBodyParse = requestParams.join("&");
	return requestBodyParse;
};

export const authFormattedLog = (authState: UserData): void => {
	console.log("\x1B[33mAuthState in Redux\x1B[0m");
	Object.entries(authState).forEach((entry) => {
		console.log(
			`\x1B[36m${typeof entry[1]} \x1B[0m${entry[0]}: ${entry[1]}`
		);
	});
};
