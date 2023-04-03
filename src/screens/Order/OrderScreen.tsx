import React, { useEffect, useState } from 'react'
import { Image, View, Text, NativeBaseProvider, Box, HStack, VStack, Button, Center, Spacer, FlatList, Icon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux/AuthSlice';
import { OrderStackParamList } from '../../router';
import { Item } from '../../services/item';
import { getAllItemByUserIdSync } from '../../services/item/item';
import Avatar from '../../components/Avatar';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';

type OrderScreenProps = NativeStackScreenProps<OrderStackParamList, 'OrderStack'>;

const Profile: React.FunctionComponent<
	{ userAvatarUrl: string; numItems: number } & OrderScreenProps
> = (props: { userAvatarUrl: string; numItems: number } & OrderScreenProps) => {
	const authState = useAppSelector(selectAuthState);

	return (
		<Box style={{
			borderRadius: 10,
			marginVertical: 6,
			marginHorizontal: 30,
			height: 100,
		}} width={'full'} bgColor={"primary.600"}>
			<HStack flex={1} alignItems={"center"}>
				<View style={{ marginLeft: 10, marginRight: 15 }}>
					<Avatar />
				</View>
				<VStack space={2}>
					<Text style={{ color: "white" }} fontSize={"lg"}>{authState.userName}</Text>
					<Text style={{ color: "white" }} fontSize={"sm"}>{"You have " + props.numItems + " items up to sale"}</Text>
				</VStack>
				<Button
					backgroundColor={"white"}
					style={{
						marginLeft: 15,
						width: 70,
						height: 45,
						borderRadius: 10,
					}}
					onPress={() => {
						props.navigation.navigate('OrderCreateStack');
					}}
				><Text color={"primary.700"} bold>Post</Text>
				</Button>
			</HStack>
		</Box >
	)
}

const ProfileNotLogin: React.FunctionComponent<OrderScreenProps> = (props: OrderScreenProps) => {
	return (
		<Box style={{
			borderRadius: 10,
			marginVertical: 6,
			marginHorizontal: 30,
			height: 100,
		}} width={'full'} bgColor={"primary.600"}>
			<Center
				flex={"1"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Text style={{ color: "white" }} fontSize={"lg"}>Please login to check your orders.</Text>
			</Center>
		</Box >
	)
}

const OrderList: React.FunctionComponent<{ items: Item.Item[] } & OrderScreenProps> = (
	props: { items: Item.Item[] } & OrderScreenProps
) => {
	const data = props.items;
	return (
		<FlatList
			width={"full"}
			borderColor={"gray.400"}
			style={{
				borderBottomWidth: 0,
				borderRightWidth: 1,
				borderLeftWidth: 1,
				borderTopWidth: 1,
				borderTopLeftRadius: 20,
				borderTopRightRadius: 20,
			}}
			data={data}
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
						<VStack>
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
						<Icon
							as={Ionicons}
							name={"arrow-forward-sharp"}
							color="coolGray.400"
							size={6}
							onPress={() => {
								props.navigation.navigate('OrderDetailStack', { item });
							}}
						/>
					</HStack>
				</Box>
			}
		/>
	);
}

const OrderScreen: React.FunctionComponent<OrderScreenProps> = (props: OrderScreenProps) => {
	const authState = useAppSelector(selectAuthState);
	const [items, setItems] = useState<Item.Item[] | undefined>(undefined);

	/**
	 * Method to refresh the screen on focusing
	 */
	const isFocused = useIsFocused();

	const loadOrders = async (): Promise<void> => {
		if (authState.userId && authState.userToken) {
			const data = await getAllItemByUserIdSync(authState.userId, authState.userToken);
			if (data) {
				setItems(data)
			};
		};
	};

	useEffect(() => {
		if (authState.isSignout === true) {
			setItems(undefined);
		} else {
			loadOrders();
		}
	}, [authState.isSignout, isFocused]); // Register isFocused in useEffect to force refresh

	return (
		<NativeBaseProvider>
			<View style={{
				flex: 1, alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10
			}}>
				{
					!items ? <ProfileNotLogin {...props} /> :
						<Profile
							numItems={items.length}
							userAvatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
							{...props}
						/>
				}
				{!items ? null : <OrderList {...props} items={items} />}
			</View>
		</NativeBaseProvider>

	);
}

export default OrderScreen;
