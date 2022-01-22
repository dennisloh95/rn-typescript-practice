import { View, Text, Button } from "react-native";
import React from "react";
import { RootStackNavigation } from "@/navigator/index";

interface IProps {
  navigation: RootStackNavigation;
}

const Home: React.FC<IProps> = (props) => {
  const onPress = () => {
    const { navigation } = props;
    navigation.navigate("Detail", { id: 100 });
  };

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onPress} title="跳转" />
    </View>
  );
};

export default Home;
