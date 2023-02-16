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