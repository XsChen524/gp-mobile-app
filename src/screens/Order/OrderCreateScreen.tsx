import React, { useReducer } from 'react'
import { NativeBaseProvider, FormControl, Input, Box, Text, Center, Heading, VStack, Button, useToast } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../router';
import { Item } from '../../services/item';
import { postNewItemSync } from '../../services/item/item';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux/AuthSlice';

type OrderCreateProps = NativeStackScreenProps<OrderStackParamList, "OrderCreateStack">;

type FormState = {
	userId?: string;
	itemName?: string;
	itemDes?: string;
	askPrice?: string;
};

const formReducer = (state: FormState, action: { type: string; payload: string }): FormState => {
	const { type, payload } = action;
	return { ...state, [type]: payload };
};

const checkEmptyInput = async (input: Object): Promise<boolean> => {
	return new Promise<boolean>((resolve) => {
		Object.values(input).forEach((value) => {
			if (typeof value === "undefined" || value == "") resolve(false)
		});
		resolve(true);
	})
}

const OrderCreateScreen: React.FunctionComponent<OrderCreateProps> = (props: OrderCreateProps) => {
	const authState = useAppSelector(selectAuthState);

	const initialState: FormState = {
		userId: (authState.userId as number).toString(),
		itemName: undefined,
		itemDes: undefined,
		askPrice: undefined,
	}

	const [formState, formDispatch] = useReducer(formReducer, initialState);

	const handleChange = (type: string, payload: string): void => {
		formDispatch({ type, payload });
	};

	return (
		<NativeBaseProvider>
			<Center w="100%">
				<Box safeArea p="2" w="90%" maxW="290" py="8">
					<Heading size="lg" color="coolGray.800" fontWeight="semibold">
						<Text>Start selling your items</Text>
					</Heading>
					<VStack space={3} mt="5">
						<FormControl>
							<FormControl.Label>Your Id</FormControl.Label>
							<Input
								value={(authState.userId as number).toString()}
								isReadOnly
								type="text"
							/>
						</FormControl>
						<FormControl>
							<FormControl.Label>Name of your item</FormControl.Label>
							<Input type="text" onChangeText={(text) => {
								handleChange("itemName", text);
							}} />
						</FormControl>
						<FormControl>
							<FormControl.Label>Description</FormControl.Label>
							<Input type='text' h={'20'} onChangeText={(text) => {
								handleChange('itemDes', text);
							}} />
						</FormControl>
						<FormControl>
							<FormControl.Label>Price you ask</FormControl.Label>
							<Input type='number' keyboardType='numeric' onChangeText={(text) => {
								handleChange('askPrice', text);
							}} />
						</FormControl>
						<Button
							onPress={() => {

								checkEmptyInput(formState).then((hasNoEmpty) => {
									if (hasNoEmpty) {
										if (!isNaN(Number(formState.askPrice)) && !isNaN(Number(formState.userId))) {
											console.log(Number(formState.askPrice));
											const postFrom: Item.ItemPostBody = {
												userId: Number(formState.userId),
												itemName: formState.itemName as string,
												itemDes: formState.itemDes as string,
												askPrice: Number(formState.askPrice)
											}
											postNewItemSync(postFrom, authState.userToken as string).then((data) => {
												props.navigation.goBack();
											})
										}
									}
								})
							}}
						>Submit</Button>
					</VStack>
				</Box>
			</Center>
		</NativeBaseProvider>
	);
}

export default OrderCreateScreen;
