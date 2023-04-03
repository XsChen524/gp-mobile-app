import { Box, Image } from "native-base";

const LuckyDrawCard: React.FunctionComponent<{ userName: string | undefined }> = (props: { userName: string | undefined }) => {
	return (
		<>
			{!props.userName ? undefined :
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
						} />
				</Box>
			}
		</>
	);
}

export { LuckyDrawCard }
