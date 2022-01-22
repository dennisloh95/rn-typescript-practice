import { View, Text } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigator/index";

interface IProps {
  route: RouteProp<RootStackParamList, "Detail">;
}

const Detail: React.FC<IProps> = (props) => {
  const { route } = props;

  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Detail;
