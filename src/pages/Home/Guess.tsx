import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/models/index";
import { IGUESS } from "@/models/home";
import Touchable from "@/components/Touchable";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface IProps {
  namespace: string;
}

const Guess: React.FC<IProps> = ({ namespace }) => {
  const {
    home: { guess },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    dispatch({
      type: `${namespace}/fetchGuess`,
    });
  };

  const renderItem = ({ item }: { item: IGUESS }) => {
    return (
      <Touchable
        style={styles.item}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <AntDesign name="hearto" size={16} color="black" />
          <Text style={styles.headerTitle}>猜你喜欢</Text>
        </View>
        <View style={styles.headerLeft}>
          <Text style={styles.moreText}>更多</Text>
          <AntDesign name="right" size={16} color="black" />
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        numColumns={3}
        data={guess}
        renderItem={renderItem}
      />
      <Touchable style={styles.changeGuess} onPress={fetch}>
        <AntDesign name="reload1" size={16} color="red" />
        <Text style={styles.changeGuessText}>换一批</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: "#efefef",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 5,
    color: "#333",
  },
  moreText: {
    marginRight: 3,
    color: "#6f6f6f",
  },
  changeGuess: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});

export default Guess;
