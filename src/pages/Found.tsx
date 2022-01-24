import { View, Text, Button } from "react-native";
import React from "react";
import { RootStackNavigation } from "@/navigator/index";

interface IProps {
  navigation: RootStackNavigation;
}

const Found: React.FC<IProps> = (props) => {
  const onPress = () => {
    const { navigation } = props;
    navigation.navigate("Detail", { id: 100 });
  };

  return (
    <View>
      <Text>Found</Text>
      <Button onPress={onPress} title="Jump" />
    </View>
  );
};

export default Found;
