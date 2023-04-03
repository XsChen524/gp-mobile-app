import { User } from ".";
import config from "../../config/config";

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
