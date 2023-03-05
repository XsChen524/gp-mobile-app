import { Item } from ".";
import config from "../../config/config";
import { parseUrlEncodedBody } from "../../utils/utils";

/**
 * POST form to create a new item for current user
 * @param {Item.ItemPostBody} form
 * @param {string} jwt
 * @returns Promise<Item.Item | undefined>
 */
export const postNewItemSync = async (
	form: Item.ItemPostBody,
	jwt: string
): Promise<Item.Item | undefined> => {
	const requestBody: string = parseUrlEncodedBody(form);
	const response = await fetch(config.env.pro + config.url.item, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: requestBody,
	});
	const itemCreateResponse: Item.ItemCreateResponse = await response.json();
	if (itemCreateResponse.status === false) {
		return undefined;
	}
	const item: Item.Item = itemCreateResponse.data;
	return item;
};

/**
 * Get all items created by current user
 * @param {number} userId
 * @param {string} jwt
 * @returns Promise<Item.Item[] | undefined>
 */
export const getAllItemSync = async (
	userId: number,
	jwt: string
): Promise<Item.Item[] | undefined> => {
	const response = await fetch(
		config.env.pro + config.url.item.getAll + `/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${jwt}`,
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
			},
		}
	);
	const itemGetAllResponse: Item.ItemGetAllResponse = await response.json();
	if (itemGetAllResponse.status === false) {
		return undefined;
	}
	const items: Item.Item[] = itemGetAllResponse.data;
	return items;
};
