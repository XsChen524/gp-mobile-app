import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text, Image, VStack, Box, Row, Column, Divider, ScrollView, Fab } from "native-base"
import { TransactionStackParamList } from "../../router";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthState } from "../../redux/AuthSlice";
import { Item } from "../../services/item";
import { getUserByIdSync } from "../../services/user/user";
import { useState, useEffect } from "react";
import { User } from "../../services/user";
import moment from "moment";
import { ToastAndroid } from "react-native";
import { createTransactionSync } from "../../services/transaction/transaction";
import { Tx } from "../../services/transaction";

type TransactionDetailProps = NativeStackScreenProps<TransactionStackParamList, "TransactionDetailStack">

const TxDetailEntry: React.FunctionComponent<{
	des: string, text: string | number | undefined
}> = (props: { des: string, text: string | number | undefined }) => {
	return (
		<>
			<Row my={"2"} alignItems={"center"} space={"lg"}>
				<Column width={"1/4"}>
					<Text fontSize={"md"} bold >{props.des}:</Text>
				</Column>
				<Column>
					<Text>{props.text}</Text>
				</Column>
			</Row>
			<Divider />
		</>
	)
}

const TxDetail: React.FunctionComponent<Item.ParsedItem> = (props: Item.ParsedItem) => {
	const authState = useAppSelector(selectAuthState)
	const [seller, setSeller] = useState<User | undefined>(undefined);

	useEffect(() => {
		if (typeof seller === "undefined") {
			getUserByIdSync(props.sellerId, authState.userToken as string).then((data) => {
				setSeller(data);
			})
		}
	}, [])

	return (
		<>
			<VStack>
				<Box
					width={"full"}
					backgroundColor={"gray.300"}
					alignItems={"center"}
					justifyContent={"center"}
					overflow={"hidden"}
					style={{
						height: 350
					}}>
					<Image
						alt={"image"}
						height="300"
						width="300"
						source={{
							uri: props.picUrl
						}}
					/>
				</Box>
				<Box px={"4"} py={"2"}>
					<TxDetailEntry des={'Item ID'} text={props.id} />
					<TxDetailEntry des={"Item Name"} text={props.itemName} />
					<TxDetailEntry des={"Description"} text={props.itemDescription} />
					{seller ? <TxDetailEntry des={"Seller"} text={seller.name} /> : undefined}
					<TxDetailEntry des={"Ask Price"} text={props.price} />
					<TxDetailEntry des={"State"} text={props.state} />
					<TxDetailEntry des={"Created At"} text={moment.utc(props.createdAt).format("YYYY/MM/DD HH:mm:ss")} />
					<TxDetailEntry des={"Updated At"} text={moment.utc(props.updatedAt).format("YYYY/MM/DD HH:mm:ss")} />
				</Box>
			</VStack>

		</>
	)
}

const TransactionDetailScreen: React.FunctionComponent<TransactionDetailProps> = (props: TransactionDetailProps) => {
	const authState = useAppSelector(selectAuthState);
	/**
	 * Object of item fetched
	 * @type {Item.Item}
	 */
	const rawItem: Item.Item = props.route.params.item;

	/**
	 * convert item keys to camel case
	 */
	const item: Item.ParsedItem = {
		id: rawItem.id,
		state: rawItem.state,
		price: rawItem.price,
		createdAt: rawItem.createdAt,
		updatedAt: rawItem.updatedAt,
		sellerId: rawItem.seller_id,
		picUrl: rawItem.pic_url,
		itemName: rawItem.item_name,
		itemDescription: rawItem.item_description,
	}

	const checkSum = async (price: number): Promise<boolean> => {
		const data = await getUserByIdSync(authState.userId as number, authState.userToken as string);
		return (typeof data !== "undefined" && data.balance >= price) ? true : false;
	}

	const showToast = (msg: string): void => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};

	if (authState.isSignout) {
		return (
			<NativeBaseProvider>
				<Text>Please login to continue.</Text>
			</NativeBaseProvider>
		)
	}
	return (
		<NativeBaseProvider>
			<Box>
				<ScrollView height={"full"}>
					<TxDetail {...item} />
				</ScrollView>
				<Fab
					renderInPortal={false}
					shadow={2}
					label="BUY"
					colorScheme={authState.userId === item.sellerId ? "gray" : "primary"}
					disabled={authState.userId === item.sellerId ? true : false}
					onPress={async () => {
						await checkSum(item.price) ?
							createTransactionSync(authState.userId as number, item, authState.userToken as string).then((tx) => {
								if (tx) {
									props.navigation.navigate("PostTranStack", { tx });
								}

							})
							: showToast("Balance is not sufficient!")
					}}
				/>
			</Box>
		</NativeBaseProvider>
	)
}

export default TransactionDetailScreen;
