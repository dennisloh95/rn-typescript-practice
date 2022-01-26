import { View, Text, ListRenderItemInfo, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/models/index";
import { FlatList } from "react-native-gesture-handler";
import { IProgram } from "@/models/album";
import Item from "./Item";

const List = () => {
  const { list } = useSelector((state: RootState) => state.album);

  const onPress = (data: IProgram) => {
    console.log(data);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={onPress} />;
  };

  const keyExtractor = (item: IProgram) => item.id;

  return (
    <FlatList
      style={styles.container}
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default List;
