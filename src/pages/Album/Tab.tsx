import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import Introduction from "./Introduction";
import List from "./List";

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

const Tab: React.FC = () => {
  const [index, setIndex] = useState(1);
  const onIndexChange = (index: number) => {
    setIndex(index);
  };
  const renderScene = ({ route }: { route: IRoute }) => {
    switch (route.key) {
      case "introduction":
        return <Introduction />;
      case "album":
        return <List />;
    }
  };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: IState }
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
      />
    );
  };

  return (
    <TabView
      navigationState={{
        routes: [
          { key: "introduction", title: "简介" },
          { key: "album", title: "节目" },
        ],
        index: index,
      }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  tabStyle: {
    width: 80,
  },
  label: {
    color: "#333",
  },
  indicator: {
    backgroundColor: "#eb6d48",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: "#fff",
  },
});

export default Tab;
