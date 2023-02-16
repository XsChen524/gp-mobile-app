import * as React from "react";
import { Button, NativeBaseProvider, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { settingSpace } from "../../../typings";

type SettingStackParamList = settingSpace.SettingStackParamList;
type IProps = NativeStackScreenProps<SettingStackParamList, "SignupStack">;

const SignupScreen: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <NativeBaseProvider>
      <Text>Signup Screen</Text>
      <Button
        onPress={() => {
          props.navigation.navigate("LoginStack");
        }}
      >Login</Button>
    </NativeBaseProvider>
  );
};

export default SignupScreen;
