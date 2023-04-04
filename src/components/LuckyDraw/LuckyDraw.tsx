import { Box, Image, useToast } from "native-base";
import { Pressable } from "react-native";
import { getUserByIdSync, updateBalanceRankSync } from "../../services/user/user";

const LuckyDrawCard: React.FunctionComponent<
	{
		token: string;
		userId: number;
		userName: string;
	}
> = (props: { token: string; userId: number; userName: string | undefined }) => {
	const toast = useToast();

	const onPress = (): void => {
		getUserByIdSync(props.userId, props.token).then((user) => {
			if (user) {
				const { balance } = user;
				const luckyDraw = parseFloat((Math.random() * 100).toFixed(2))
				const newBalance = balance + luckyDraw;
				updateBalanceRankSync(user, props.token, newBalance, undefined).then(data => {
					if (data) {
						toast.show({
							description: `You got \$${luckyDraw}! New balance is \$${data.balance}.`
						})
					}
				})
			}
		})
	}

	return (
		<>
			{!props.userName ? undefined :
				<Pressable onPress={onPress}>
					<Box
						mt={"3"}
						width={"320"}
						minHeight={"100"}
						borderRadius={"20"}
						overflow={"hidden"}
					>
						<Image
							alt={"Lucky_Draw"}
							source={
								require("../../assets/images/luckydraw_banner.png")
							}
						/>
					</Box>
				</Pressable>
			}
		</>
	);
}

export { LuckyDrawCard }
