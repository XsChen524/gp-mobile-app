import * as React from "react";
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface MenuItemProps {
  onclick(): void;
  id: number;
  func: string;
  componentName: string;
}

const MenuItem:React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { func, id, componentName, onclick } = props;
  
  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" pl="4" pr="5" py="4">
      <Pressable onPress={onclick}>
        <HStack space={4} justifyContent="space-between">
          <Icon
            as={MaterialIcons}
            name={componentName}
            color={"coolGray.800"}
            size={6}
          />
          <VStack>
            <Center>
              <Text color={"coolGray.800"} fontSize={16}>{func}</Text>
            </Center>
          </VStack>
          <Spacer />
          <Icon
            as={Ionicons}
            name={"arrow-forward-sharp"}
            color="coolGray.800"
            size={6}
          />
        </HStack>
      </Pressable>
    </Box>
  );
};

export default MenuItem;
