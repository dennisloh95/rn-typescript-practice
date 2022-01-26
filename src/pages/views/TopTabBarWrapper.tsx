import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Touchable from "@/components/Touchable";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "@/models/index";
import { useEffect } from "react";
import { getActiveRouteName } from "@/utils/index";

type IProps = MaterialTopTabBarProps;

const TopTabBarWrapper: React.FC<IProps> = (props) => {
  const routeName = getActiveRouteName(props.state);
  const insets = useSafeAreaInsets();
  const state = useSelector((state: RootState) => state);
  const { carousels, gradientVisible, activeCarouselIndex } = state[routeName];

  let textStyle = styles.text;
  useEffect(() => {
    if (gradientVisible) {
      textStyle = styles.whiteText;
    }
  }, [gradientVisible, props.navigation]);

  function linearGradient() {
    const linearColors = carousels[activeCarouselIndex]?.colors || [
      "#ccc",
      "#e2e2e2",
    ];
    if (gradientVisible) {
      return <LinearGradient colors={linearColors} style={styles.gradient} />;
    }
    return null;
  }

  const goCategory = () => {
    const { navigation } = props;
    navigation.navigate("Category");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {linearGradient()}
      <View style={styles.topTabBarView}>
        <View style={{ flex: 1 }}>
          <MaterialTopTabBar {...props} />
        </View>
        <Touchable style={styles.categoryBtn} onPress={goCategory}>
          <Text style={textStyle}>分类</Text>
        </Touchable>
      </View>
      <View style={styles.bottom}>
        <Touchable style={styles.searchBtn}>
          <Text style={textStyle}>搜索</Text>
        </Touchable>
        <Touchable style={styles.HistoryBtn}>
          <Text style={textStyle}>历史记录</Text>
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  topTabBarView: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: "#ccc",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  HistoryBtn: {
    marginLeft: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 280,
  },
  text: {
    color: "#333",
  },
  whiteText: {
    color: "#fff",
  },
});

export default TopTabBarWrapper;
