import Home from "@/pages/Home";
import Listen from "@/pages/Listen";
import TopTabBarWrapper from "@/pages/views/TopTabBarWrapper";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../models";

const Tab = createMaterialTopTabNavigator();

function renderTabBar(props: MaterialTopTabBarProps) {
  return <TopTabBarWrapper {...props} />;
}

const HomeTabs = () => {
  const {
    home: { gradientVisible },
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
          flex: 1,
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "推荐",
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Listen}
        options={{
          title: "推荐",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: "transparent",
  },
});

export default HomeTabs;
