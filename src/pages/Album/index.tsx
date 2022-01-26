import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigator/index";
import { useEffect } from "react";
import coverRight from "@/assets/cover-right.png";
import { BlurView } from "expo-blur";
import Tab from "./Tab";

interface IProps {
  route: RouteProp<RootStackParamList, "Album">;
}

const Album: React.FC<IProps> = ({
  route: {
    params: { item },
  },
}) => {
  const { summary, author } = useSelector((state: RootState) => state.album);
  const { id, title, image } = item;
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "album/fetchAlbum",
      payload: {
        id,
      },
    });
  }, []);

  function renderHeader() {
    return (
      <View style={[styles.header, { paddingTop: headerHeight }]}>
        <Image source={{ uri: image }} style={styles.background} />
        <BlurView
          style={[StyleSheet.absoluteFillObject]}
          tint="light"
          intensity={15}
        />
        <View style={styles.leftView}>
          <Image style={styles.thumbnail} source={{ uri: image }} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{ uri: author.avatar }} style={styles.avatar} />
            <Text style={styles.authorName}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Tab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 260,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#eee",
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  coverRight: {
    height: 98,
    position: "absolute",
    right: -23,
    resizeMode: "contain",
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  summary: {
    backgroundColor: "rgba(0,0,0,.3)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: "#fff",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  authorName: {
    color: "#fff",
  },
});

export default Album;
