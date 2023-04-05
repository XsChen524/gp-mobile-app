import { Box, FlatList, HStack, NativeBaseProvider, Text, Image, VStack, Spacer, Button } from "native-base"
import { TransactionStackParamList } from "../../router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type MyTxsProps = NativeStackScreenProps<TransactionStackParamList, "MyTransactionsStack">

const TxList: React.FunctionComponent<MyTxsProps> = (props: MyTxsProps) => {
	const txs = props.route.params.txs;

	return (
		<FlatList
			width={"full"}
			data={txs}
			keyExtractor={tx => tx.txId.toString()}
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
								Item Id: {item.itemId}
							</Text>
							<Text color="coolGray.500" fontSize={"sm"}>
								Rate: {item.buyerRate}
							</Text>
						</VStack>
						<Spacer />
						<VStack style={{
							flexDirection: "column",
							alignItems: "flex-end",
							marginRight: 10,
						}}>
							<Text fontSize="xs" color="coolGray.800" bold>
								Deal price: {item.price}
							</Text>
							<Text fontSize="xs" color={item.state === "up_for_sale" ? "green.600" : "danger.600"}>
								{item.state === "up_for_sale" ? "For sale" : "Closed"}
							</Text>
						</VStack>
						<Button
							size={"sm"}
							fontSize={"sm"}
							variant="solid"
							colorScheme="primary"
							onPress={() => {
								props.navigation.navigate('MyTransactionDetailStack', { tx: item });
							}}
						>Detail</Button>
					</HStack>
				</Box>
			}
		/>
	)
}

const MyTxsScreen: React.FunctionComponent<MyTxsProps> = (props: MyTxsProps) => {
	return (
		<NativeBaseProvider>
			<Box
				height={"full"}
				alignContent={"center"}
				justifyContent={"center"}
			>
				<TxList {...props} />
			</Box>
		</NativeBaseProvider>
	)
}

export default MyTxsScreen;
