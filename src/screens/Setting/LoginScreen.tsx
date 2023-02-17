import * as React from 'react';
import { Box, Button, Center, FormControl, HStack, Heading, Input, Link, NativeBaseProvider, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { routerSpace } from "../../../typings/router";

type SettingStackParamList = routerSpace.SettingStackParamList;
type IProps = NativeStackScreenProps<SettingStackParamList, "LoginStack">;

const Header: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>
    </>
  );
}

const LoginForm: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <FormControl>
        <FormControl.Label>Email ID</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input type="password" />
        <Link
          _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500",
          }}
          alignSelf="flex-end"
          mt="1"
        >
          Forget Password?
        </Link>
      </FormControl>
      <Button mt="2" height={10} color="primary.500">
        Login
      </Button>
    </>
  );
}

const NavigationToSignUp: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <Text
        fontSize="sm"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
      >
        I'm a new user.{" "}
      </Text>
      <Link
        _text={{
          color: "indigo.500",
          fontWeight: "medium",
          fontSize: "sm",
        }}
        onPress={()=>{
          props.navigation.navigate("SignupStack");
        }}
      >
        Sign Up
      </Link>
    </>
  );
}

const LoginScreen: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Header {...props} />
          <VStack space={3} mt="5">
            <LoginForm {...props}/>
            <HStack mt="6" justifyContent="center">
              <NavigationToSignUp {...props}/>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;