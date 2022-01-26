import { View, Text } from "react-native";
import React from "react";
import { IProgram } from "@/models/album";
import Touchable from "@/components/Touchable";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram) => void;
}

const Item: React.FC<IProps> = ({ data, index, onPress }) => {
  const handlePress = () => {
    if (typeof onPress === "function") {
      onPress(data);
    }
  };

  return (
    <Touchable style={styles.item} onPress={handlePress}>
      <Text style={styles.serial}>{index + 1}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.info}>
          <View style={styles.iconView}>
            <AntDesign name="customerservice" color="#939393" />
            <Text style={styles.iconText}>{data.playVolume}</Text>
          </View>
          <View style={styles.iconView}>
            <AntDesign name="clockcircleo" color="#939393" />
            <Text style={styles.iconText}>{data.duration}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.date}>{data.date}</Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  serial: {
    fontSize: 14,
    color: "#838383",
    fontWeight: "800",
  },
  title: {
    fontWeight: "500",
    marginBottom: 15,
  },
  info: {
    flexDirection: "row",
  },
  iconView: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
  },
  iconText: {
    marginHorizontal: 5,
    color: "#939393",
  },
  date: {
    color: "#939393",
  },
});

export default Item;
