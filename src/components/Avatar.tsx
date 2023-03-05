import { Image, View } from 'react-native'

const Avatar: React.FunctionComponent<{}> = () => {
	/*
		<Avatar size={"lg"}
			bg={"gray.800"}
			source={require('../../assets/images/avatar.png')}
		>{props.userName.slice(0, 2).toUpperCase()}</Avatar>
	*/
	return (
		<View
			style={{
				borderRadius: 50,
				width: 70,
				height: 70,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "white"
			}}
		>
			<Image style={{
				width: 50,
				height: 50
			}} source={require('../assets/images/avatar.png')} />
		</View>
	)
}

export default Avatar;
