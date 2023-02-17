import * as React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  NativeBaseProvider,
  Box,
  FlatList,
  Button,
  Divider,
} from "native-base";
import { routerSpace } from "../../../typings/router";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectAuthState, signIn } from "../../redux/AuthSlice";
import MenuItem from "../../components/MenuItem";

type SettingStackParamList = routerSpace.SettingStackParamList;
type IProps = NativeStackScreenProps<SettingStackParamList, 'SettingStack'>;

/**
 * Flatlist MenuItem onclick TBD
 */
const Settings = () => {
  const data = [
    {
      id: 1,
      func: "Profile",
      componentName: "person",
    },
    {
      id: 2,
      func: "Preferences",
      componentName: "settings",
    },
    {
      id: 3,
      func: "Contributors",
      componentName: "emoji-people",
    },
    {
      id: 4,
      func: "Privacy Policy & Terms of Service",
      componentName: "privacy-tip",
    },
  ];
  return (
    <Box borderWidth={1} borderColor="primary.500">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MenuItem
            {...item}
            onclick={() => {
              console.log("Button Pressed: ", item.id);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

const LoginButton: React.FunctionComponent<IProps> = (props: IProps) => {
  const authState = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        onPress={() => {
          dispatch(signIn("123456" || null));
          console.log(authState);
        }}
      >
        Dispatch
      </Button>
      <Button
        onPress={() => {
          props.navigation.navigate("LoginStack");
        }}
      >
        LoginScreen
      </Button>
    </>
  );
};

const SettingScreen: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <NativeBaseProvider>
      <Box borderColor="primary.500" borderWidth={1}>
        <Settings />
        <Divider />
        <Box alignItems="center">
          <LoginButton {...props}/>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default SettingScreen;
