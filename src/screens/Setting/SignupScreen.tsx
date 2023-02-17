import * as React from "react";
import { Box, Button, Center, FormControl, Heading, Input, NativeBaseProvider, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routerSpace } from "../../../typings/router";

type SettingStackParamList = routerSpace.SettingStackParamList;
type IProps = NativeStackScreenProps<SettingStackParamList, "SignupStack">;

const Header: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Sign Up
      </Heading>
    </>
  );
};

const LoginForm: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <FormControl>
        <FormControl.Label>Username</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input type="password" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Verify password</FormControl.Label>
        <Input type="password" />
      </FormControl>
      <Button marginTop={5} height={10} mt="2" color="primary.500">
        Sign up
      </Button>
    </>
  );
};

const SignupScreen: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Header {...props} />
          <VStack space={3} mt="5">
            <LoginForm {...props} />
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignupScreen;
