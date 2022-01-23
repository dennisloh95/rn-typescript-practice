import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { RootStackNavigation } from "@/navigator/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";

interface IProps {
  navigation: RootStackNavigation;
}

const Home: React.FC<IProps> = (props) => {
  const {
    home: { num },
    loading: { effects: loading },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch({
      type: "home/add",
      payload: {
        num: 10,
      },
    });
  };

  const onPress = () => {
    const { navigation } = props;
    navigation.navigate("Detail", { id: 100 });
  };

  const asyncAdd = () => {
    dispatch({
      type: "home/asyncAdd",
      payload: {
        num: 2,
      },
    });
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>{loading["home/asyncAdd"] == true ? "正在努力计算中" : ""}</Text>
      <Text>{num}</Text>
      <Button title="加" onPress={handleAdd} />
      <Button title="异步" onPress={asyncAdd} />
      <Button onPress={onPress} title="跳转" />
    </View>
  );
};

export default Home;
