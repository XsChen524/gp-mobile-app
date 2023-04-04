import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text } from "native-base"
import { TransactionStackParamList } from "../../router";

type PostTranProps = NativeStackScreenProps<TransactionStackParamList, "PostTranStack">

const PostTranScreen: React.FunctionComponent<PostTranProps> = (props: PostTranProps) => {
	console.log(props.route.params.tx);
	return (
		<NativeBaseProvider>
			<Text>Post Transaction</Text>
		</NativeBaseProvider>
	)
}

export default PostTranScreen;
