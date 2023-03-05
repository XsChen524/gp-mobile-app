import React from "react";
import { Box, NativeBaseProvider, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../router";

type OrderDetailProps = NativeStackScreenProps<OrderStackParamList, 'OrderDetailStack'>;

const OrderDetailScreen: React.FunctionComponent<OrderDetailProps> = (props: OrderDetailProps) => {
	const item = props.route.params.item;
	console.log(item);
	return (
		<NativeBaseProvider>
			<Box>
				<Text>Details</Text>
			</Box>
		</NativeBaseProvider>
	)
}

export default OrderDetailScreen;
