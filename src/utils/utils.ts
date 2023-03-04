import * as SecureStore from 'expo-secure-store'

/**
 * Save value to Android secure storage by its key.
 * @param {string} key
 * @param {string} value
 * @returns {Promise<void>} Async method.
 */
export const saveValueToStorage = async (key: string, value: string): Promise<void> => {
	await SecureStore.setItemAsync(key, value);
};

/**
 * Get value from Android secure storage by its key.
 * @param {string} key
 * @returns {Promise<string>} Get a string value by resolving the promise.
 */
export const getValueFromStorage = async (key: string): Promise<string | undefined> => {
	const value = await SecureStore.getItemAsync(key);
	return (typeof value === "string" ? value : undefined);
};

/**
 * Determine if the key is one of keys in object
 * @param key
 * @param object
 * @returns boolean
 */
const isValidKey = (key: string | number | symbol, object: object): key is keyof typeof object => {
	return key in object;
}

/**
 * Parse the object of request body into UrlEncoded string
 * @param {Object} obj Object of type T
 * @returns {string} x-www-form-urlencoded request body
 */
export const parseUrlEncodedBody = (obj: Object): string => {
	let requestParams: string[] = new Array<string>();
	Object.keys(obj).forEach((key) => {
		if (isValidKey(key, obj)){
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(obj[key]);
			requestParams.push(encodedKey + "=" + encodedValue);
		}
	});
	let requestBodyParse = requestParams.join("&");
	return requestBodyParse;
};
