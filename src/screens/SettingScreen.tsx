/* eslint-disable no-unused-vars */
import {
  NativeBaseProvider,
  Center,
  Box,
  FlatList,
  Button,
  Divider,
} from "native-base";
import * as React from "react";
import MenuItem from "../components/MenuItem";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectAuthState, signIn } from "../auth/AuthSlice";

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

const LoginButton: React.FunctionComponent<{}> = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <Button onPress={() => {
      console.log(authState);
      dispatch(signIn('token' || null));
    }}>Click Me</Button>
  );
};

const SettingScreen: React.FunctionComponent<{}> = () => {
  return (
    <NativeBaseProvider>
      <Box borderColor="primary.500" borderWidth={1}>
        <Settings />
        <Divider />
        <Box alignItems="center">
          <LoginButton />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default SettingScreen;
