import { User, UserUpdateResult } from ".";
import config from "../../config/config";
import { parseUrlEncodedBody } from "../../utils/utils";

export const getUserByIdSync = async (
	userId: number,
	jwt: string
): Promise<User | undefined> => {
	const response = await fetch(
		config.env.pro + config.url.user.index + `/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
	const getUserByIdResponse: { status: boolean; data?: User } =
		await response.json();
	if (!getUserByIdResponse.status) {
		return undefined;
	}
	return getUserByIdResponse.data as User;
};

export const updateBalanceRankSync = async (
	user: User,
	jwt: string,
	balance?: number,
	rank?: number
): Promise<UserUpdateResult | undefined> => {
	const userId = user.id;
	const prevBalance = user.balance;
	const prevRank = user.rank;
	if (typeof balance === "undefined") {
		balance = prevBalance;
	}
	if (typeof rank === "undefined") {
		rank = prevRank;
	}

	const response = await fetch(
		config.env.pro + config.url.user.index + `/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
				Authorization: `Bearer ${jwt}`,
			},
			body: parseUrlEncodedBody({ balance: balance, rank: rank }),
		}
	);
	const update: { status: boolean; data?: UserUpdateResult } =
		await response.json();
	if (!update.status) {
		return undefined;
	}
	return update.data as UserUpdateResult;
};
