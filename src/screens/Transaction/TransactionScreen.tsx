import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Text, Image, Box, FlatList, HStack, Spacer, VStack, Button } from "native-base";
import { Item } from "../../services/item";
import { useIsFocused } from "@react-navigation/native";
import { getAllItemsSync } from "../../services/item/item";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthState } from "../../redux/AuthSlice";
import moment from "moment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransactionStackParamList } from "../../router";

type TransactionScreenProps = NativeStackScreenProps<TransactionStackParamList, 'TransactionStack'>

const ItemList: React.FunctionComponent<
	{ items: Item.Item[] } & TransactionScreenProps
> = (props: { items: Item.Item[] } & TransactionScreenProps) => {
	return (
		<FlatList
			width={"full"}
			data={props.items}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) =>
				<Box
					borderBottomColor={"gray.400"}
					style={{
						borderBottomWidth: 1,

						paddingHorizontal: 20,
						paddingVertical: 10
					}}>
					<HStack space={[2, 3]}
						style={{
							flex: 1,
							alignItems: "center"
						}}
					>
						<Image
							style={{ width: 50, height: 50 }}
							source={require('../../assets/images/product.png')}
							alt='item'
						/>
						<VStack maxWidth={"120"}>
							<Text color="coolGray.800" bold>
								{item.item_name}
							</Text>
						</VStack>
						<Spacer />
						<VStack style={{
							flexDirection: "column",
							alignItems: "flex-end",
							marginRight: 10,
						}}>
							<Text fontSize="xs" color="coolGray.800" bold>
								Ask price: {item.price}
							</Text>
							<Text fontSize="xs" color="coolGray.600">
								Update: {moment.utc(item.updatedAt).utcOffset(480).format("LL")}
							</Text>
						</VStack>
						<Button
							size={"sm"}
							fontSize={"sm"}
							onPress={() => {
								props.navigation.navigate('TransactionDetailStack', { item });
							}}
						>Detail</Button>
					</HStack>
				</Box>
			}
		/>
	)
}

const TransactionScreen: React.FunctionComponent<TransactionScreenProps> = (props: TransactionScreenProps) => {
	const authState = useAppSelector(selectAuthState);
	const [items, setItems] = useState<Item.Item[] | undefined>(undefined);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (!authState.isSignout) {
			getAllItemsSync().then((data) => {
				setItems(data);
			})
		} else {
			setItems(undefined);
		}
	}, [isFocused, authState.isSignout]);

	return (
		<NativeBaseProvider>
			<Box
				height={"full"}
				alignContent={"center"}
				justifyContent={"center"}
			>
				{
					items ? <ItemList {...props} items={items} /> : undefined
				}
			</Box>
		</NativeBaseProvider>
	)
}

export default TransactionScreen;
