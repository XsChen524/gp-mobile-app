import { Text, Divider, Row, Column } from "native-base";
import React from "react";

const OrderDetailEntry: React.FunctionComponent<{
	des: string, text: string | number | undefined
}> = (props: { des: string, text: string | number | undefined }) => {
	return (
		<>
			<Row my={"2"} alignItems={"center"} space={"lg"}>
				<Column width={"1/4"}>
					<Text fontSize={"md"} bold >{props.des}:</Text>
				</Column>
				<Column>
					<Text>{props.text}</Text>
				</Column>
			</Row>
			<Divider />
		</>
	)
}

export default OrderDetailEntry;
