import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Divider, NativeBaseProvider, Row, Text, Image, ScrollView } from "native-base"
import { TransactionStackParamList } from "../../router";
import { useEffect, useState } from "react";
import { Item } from "../../services/item";
import { useIsFocused } from "@react-navigation/native";
import { getItemByIdSync } from "../../services/item/item";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthState } from "../../redux/AuthSlice";

type MyTxDetailProps = NativeStackScreenProps<TransactionStackParamList, "MyTransactionDetailStack">

const TxDetailEntry: React.FunctionComponent<{
	des: string, text: string | number | undefined
}> = (props: { des: string, text: string | number | undefined }) => {
	return (
		<>
			<Row my={"2"} alignItems={"center"} space={"lg"}>
				<Column width={"1/2"}>
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

const TxDetailList: React.FunctionComponent<MyTxDetailProps> = (props: MyTxDetailProps) => {
	const authState = useAppSelector(selectAuthState);
	const tx = props.route.params.tx;
	const [item, setItem] = useState<Item.Item | undefined>(undefined);
	const isFocused = useIsFocused();

	useEffect(() => {
		getItemByIdSync(tx.itemId, authState.userToken as string).then((data) => {
			setItem(data);
			console.log(data);
		})
	}, [isFocused])

	return (
		<ScrollView
			minH={"100"}
			width={"full"}
		>
			{
				!item ? undefined :
					<Box
						width={"full"}
						backgroundColor={"gray.300"}
						alignItems={"center"}
						justifyContent={"center"}
						overflow={"hidden"}
						style={{
							height: 200
						}}>
						<Image
							alt={"image"}
							height="300"
							width="300"
							source={{
								uri: item?.pic_url
							}}
						/>
					</Box>
			}
			<TxDetailEntry des={"Transaction ID"} text={tx.txId} />
			<TxDetailEntry des="Seller ID" text={tx.sellerId} />
			<TxDetailEntry des="Buyer ID" text={tx.buyerId} />
			<TxDetailEntry des="Item ID" text={tx.itemId} />
			{
				!item ? undefined :
					<>
						<TxDetailEntry des="Item Name" text={item.item_name} />
						<TxDetailEntry des="Item Description" text={item.item_description} />
					</>
			}
			<TxDetailEntry des={"Price"} text={tx.price} />
			<TxDetailEntry des={"Order State"} text={tx.state} />
			<TxDetailEntry des="Seller Rate" text={tx.sellerRate} />
			<TxDetailEntry des="Buyer Rate" text={tx.buyerRate} />
			<TxDetailEntry des="Comment" text={tx.comment} />
			<TxDetailEntry des="Created At" text={tx.createdAt} />
		</ScrollView>
	)
}

const MyTxDetailScreen: React.FunctionComponent<MyTxDetailProps> = (props: MyTxDetailProps) => {
	return (
		<NativeBaseProvider>
			<TxDetailList {...props} />
		</NativeBaseProvider>
	)
}

export default MyTxDetailScreen;
