import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/models/index";

const Introduction = () => {
  const { introduction } = useSelector((state: RootState) => state.album);

  return (
    <View style={styles.container}>
      <Text>{introduction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Introduction;
