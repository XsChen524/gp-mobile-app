import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text } from "native-base"
import { TransactionStackParamList } from "../../router";

type TransactionDetailProps = NativeStackScreenProps<TransactionStackParamList, "TransactionDetailStack">

const TransactionDetailScreen: React.FunctionComponent<TransactionDetailProps> = (props: TransactionDetailProps) => {
	console.log(props.route.params.item);
	return (
		<NativeBaseProvider>
			<Text>Transaction Details</Text>
		</NativeBaseProvider>
	)
}

export default TransactionDetailScreen;
