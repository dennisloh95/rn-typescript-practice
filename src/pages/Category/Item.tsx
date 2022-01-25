import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ICategory } from "@/models/category";
import { viewportWidth } from "@/utils/index";

interface IProps {
  data: ICategory;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

const Item: React.FC<IProps> = ({ data }) => {
  return (
    <View key={data.id} style={styles.itemWrapper}>
      <View style={styles.item}>
        <Text>{data.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: 48,
  },
  item: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});

export default Item;
