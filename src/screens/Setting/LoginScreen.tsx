import * as React from 'react';
import { Button, NativeBaseProvider, Text } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { settingSpace } from "../../../typings";

type SettingStackParamList = settingSpace.SettingStackParamList;
type IProps = NativeStackScreenProps<SettingStackParamList, "LoginStack">;

const LoginScreen: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <NativeBaseProvider>
      <Text>Login Screen</Text>
      <Button
        onPress={() => {
          props.navigation.navigate("SignupStack");
        }}
      >Sign up</Button>
    </NativeBaseProvider>
  );
};

export default LoginScreen;