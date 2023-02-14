import {
  NativeBaseProvider,
  Center,
  Box,
  FlatList,
} from "native-base";
import * as React from "react";
import MenuItem from "../../components/settings/MenuItem";

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
    <Box>
      <FlatList
        data={data}
        renderItem={({ item }) => (
            <MenuItem {...item} onclick={()=>{console.log('Button Pressed: ', item.id)}} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const SettingScreen = () => {
  return (
    <NativeBaseProvider>
      <Center>
        <Settings />
      </Center>
    </NativeBaseProvider>
  );
};

export default SettingScreen;
