import * as SecureStore from 'expo-secure-store'

/**
 * Save value to Android secure storage by its key.
 * @param {string} key 
 * @param {string} value
 * @returns {Promise<void>} Async method.
 */
export const saveValueToStorage = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
}

/**
 * Get value from Android secure storage by its key.
 * @param {string} key 
 * @returns {Promise<string>} Get a string value by resolving the promise.
 */
export const getValueFromStorage = async (key: string): Promise<string> => {
  let value = await SecureStore.getItemAsync(key);
  return(value);
}

/**
 * Parse the object of request body into UrlEncoded string
 * @param {T} obj Object of type T
 * @returns {string} x-www-form-urlencoded request body
 */
export const parseUrlEncodedBody = <T> (obj: T): string => {
  let requestParams: string[] = new Array<string>();
  Object.keys(obj).forEach((key) => {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(obj[key]);
    requestParams.push(encodedKey + "=" + encodedValue);
  })
  let requestBodyParse = requestParams.join("&");
  return requestBodyParse;
}