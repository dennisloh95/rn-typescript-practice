import { createHomeModel } from "@/config/dva";
import { ICategory } from "@/models/category";
import Home from "@/pages/Home";
import Listen from "@/pages/Listen";
import TopTabBarWrapper from "@/pages/views/TopTabBarWrapper";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../models";

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

function renderTabBar(props: MaterialTopTabBarProps) {
  return <TopTabBarWrapper {...props} />;
}

function renderScreen(item: ICategory) {
  createHomeModel(item.id);
  return (
    <Tab.Screen
      key={item.id}
      name={item.id}
      component={Home}
      options={{
        title: item.name,
      }}
      initialParams={{
        namespace: item.id,
      }}
    />
  );
}

const HomeTabs = () => {
  const {
    home: { gradientVisible },
    category: { myCategories },
  } = useSelector((state: RootState) => state);

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarStyle: {
          elevation: 0,
          overflow: "hidden",
          backgroundColor: "transparent",
        },
        tabBarIndicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: gradientVisible ? "#fff" : "#f86442",
        },
        tabBarItemStyle: {
          width: 80,
        },
        tabBarActiveTintColor: gradientVisible ? "#fff" : "#f86442",
        tabBarInactiveTintColor: "#333",
      }}
    >
      {myCategories.map(renderScreen)}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: "transparent",
  },
});

export default HomeTabs;
