import React, { useEffect, useState } from "react";
import { Box, Fab, NativeBaseProvider, ScrollView, VStack, Image } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../router";
import { Item } from "../../services/item";
import { User } from "../../services/user";
import { getUserByIdSync } from "../../services/user/user";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthState } from "../../redux/AuthSlice";
import OrderDetailEntry from "../../components/OrderDetailEntry";
import moment from "moment";

type OrderDetailProps = NativeStackScreenProps<OrderStackParamList, 'OrderDetailStack'>;

type ParsedItem = {
	id: number;
	sellerId: number;
	picUrl: string;
	itemName: string;
	itemDescription: string;
	state: string;
	price: number;
	updatedAt: string;
	createdAt: string;
};

const OrderDetail: React.FunctionComponent<ParsedItem> = (props: ParsedItem) => {
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
					<OrderDetailEntry des={'Item ID'} text={props.id} />
					<OrderDetailEntry des={"Item Name"} text={props.itemName} />
					<OrderDetailEntry des={"Description"} text={props.itemDescription} />
					{seller ? <OrderDetailEntry des={"Seller"} text={seller.name} /> : undefined}
					<OrderDetailEntry des={"Ask Price"} text={props.price} />
					<OrderDetailEntry des={"State"} text={props.state} />
					<OrderDetailEntry des={"Created At"} text={moment.utc(props.createdAt).format("YYYY/MM/DD HH:mm:ss")} />
					<OrderDetailEntry des={"Updated At"} text={moment.utc(props.updatedAt).format("YYYY/MM/DD HH:mm:ss")} />
				</Box>
			</VStack>

		</>
	)
}

const OrderDetailScreen: React.FunctionComponent<OrderDetailProps> = (props: OrderDetailProps) => {
	/**
	 * Object of item fetched
	 * @type {Item.Item}
	 */
	const rawItem: Item.Item = props.route.params.item;

	/**
	 * convert item keys to camel case
	 */
	const item: ParsedItem = {
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

	return (
		<NativeBaseProvider>
			<Box>
				<ScrollView height={"full"}>
					<OrderDetail {...item} />
				</ScrollView>
				<Fab renderInPortal={false} shadow={2} label="Update" />
			</Box>
		</NativeBaseProvider>
	)
}

export default OrderDetailScreen;
