import { Tx } from ".";
import config from "../../config/config";
import { parseUrlEncodedBody } from "../../utils/utils";
import { Item } from "../item";

export const createTransactionSync = async (
	userId: number,
	item: Item.ParsedItem,
	jwt: string
): Promise<Tx.TxCreateReturnParams | undefined> => {
	const body = parseUrlEncodedBody({
		sellerId: item.sellerId,
		userId: userId,
		itemId: item.id,
		askPrice: item.price,
	});

	const response = await fetch(
		config.env.pro + config.url.transaction.index,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${jwt}`,
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
			},
			body: body,
		}
	);

	const txCreateReturn: { status: boolean; data: Tx.TxCreateReturnParams } =
		await response.json();
	if (txCreateReturn.status === false) {
		return undefined;
	}
	return txCreateReturn.data;
};

export const updateTransactionSync = async (
	txId: number,
	txUpdate: Tx.TxUpdateParams,
	jwt: string
): Promise<Tx.TxUpdateReturnParams | undefined> => {
	const body = parseUrlEncodedBody(txUpdate);
	const response = await fetch(
		config.env.pro + config.url.transaction.index + `/${txId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${jwt}`,
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
			},
			body: body,
		}
	);
	const txUpdateReturn: { status: boolean; data: Tx.TxUpdateReturnParams } =
		await response.json();
	if (txUpdateReturn.status === false) return undefined;
	return txUpdateReturn.data;
};
