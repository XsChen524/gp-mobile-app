import { NativeBaseProvider, Text } from "native-base"
import { TransactionStackParamList } from "../../router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type MyTxsProps = NativeStackScreenProps<TransactionStackParamList, "MyTransactionsStack">

const MyTxsScreen: React.FunctionComponent<MyTxsProps> = (props: MyTxsProps) => {
	const txs = props.route.params.txs;
	console.log(txs);

	return (
		<NativeBaseProvider>
			<Text>MyTransactions</Text>
		</NativeBaseProvider>
	)
}

export default MyTxsScreen;
