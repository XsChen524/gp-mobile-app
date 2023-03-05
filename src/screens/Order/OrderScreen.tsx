import React from 'react'
import { View, Text, NativeBaseProvider, ScrollView, Box, HStack, VStack, Icon, Button } from 'native-base';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux/AuthSlice';
import { OrderStackParamList } from '../../router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Avatar from '../../components/Avatar';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { baseFontSize, isLight } from 'native-base/lib/typescript/theme/tools';
import { getAllItemSync } from '../../services/item/item';

type OrderScreenProps = NativeStackScreenProps<OrderStackParamList, 'OrderStack'>;

const Profile: React.FunctionComponent<
	{ userName: string; userAvatarUrl: string; numItems: number } & OrderScreenProps
> = (props: { userName: string; userAvatarUrl: string; numItems: number } & OrderScreenProps) => {
	const authState = useAppSelector(selectAuthState);
	/*
		<Avatar size={"lg"}
			bg={"gray.800"}
			source={require('../../assets/images/avatar.png')}
		>{props.userName.slice(0, 2).toUpperCase()}</Avatar>
	*/
	return (
		<>
			<Box style={{
				borderColor: "blue.800",
				borderRadius: 10,
				borderWidth: 2,
				marginVertical: 6,
				marginHorizontal: 30,
				height: 100,
			}} width={'full'} bgColor={"primary.600"}>
				<HStack
					flex={1}
					alignItems={"center"}
				>
					<View style={{ marginLeft: 10, marginRight: 15 }}>
						<Avatar />
					</View>
					<VStack
						space={2}
					>
						<Text
							style={{
								color: "white",
							}}
							fontSize={"md"}
						>{props.userName}</Text>
						<Text
							style={{
								color: "white",
							}}
							fontSize={"sm"}
						>{"You have " + props.numItems + " items up to sale"}</Text>
					</VStack>
					<Button
						backgroundColor={"white"}
						style={{
							marginLeft: 10,
							width: 70,
							height: 45,
							borderRadius: 10,
							borderWidth: 2,
							borderColor: "black"
						}}
					><Text
						color={"primary.700"}
						bold
						onPress={() => {
							props.navigation.navigate('OrderCreateStack');
							if (authState.isSignout === false && authState.userToken) {
								/**
								 * Move to OrderScreen with a state hook
								 */
								getAllItemSync(3, authState.userToken).then((list) => {
									console.log(list);
								})
							}
						}}
					>Post</Text></Button>
				</HStack>
			</Box >
		</>
	)
}

const OrderScreen: React.FunctionComponent<OrderScreenProps> = (props: OrderScreenProps) => {
	const authState = useAppSelector(selectAuthState);

	return (
		<NativeBaseProvider>
			<View
				style={{
					flex: 1, alignItems: "center", justifyContent: "flex-start", borderWidth: 2,
					paddingHorizontal: 10
				}}
			>
				<Profile
					userName={authState.userName as string}
					numItems={12}
					userAvatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
					{...props}
				/>
				<ScrollView w={"full"}
					style={{
						borderColor: "red",
						borderWidth: 2,
					}}>

				</ScrollView>
			</View>
		</NativeBaseProvider>

	);
}

export default OrderScreen;
