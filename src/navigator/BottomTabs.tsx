import React, { useEffect } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import Home from "@/pages/Home";
import Listen from "@/pages/Listen";
import Found from "@/pages/Found";
import Account from "@/pages/Account";
import { RootStackNavigation, RootStackParamList } from ".";
import {
  EventArg,
  NavigationState,
  ParamListBase,
  RouteProp,
  TabNavigationState,
  useRoute,
} from "@react-navigation/native";

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, "BottomTabs"> & {
  state?: TabNavigationState<ParamListBase>;
};

type State = {
  state?: NavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const getHeaderTitle = (data: any) => {
  const routeName = data.state
    ? data.state.routes[data.state.index].name
    : "Home";
  switch (routeName) {
    case "Home":
      return "首页";
    case "Listen":
      return "我听";
    case "Found":
      return "发现";
    case "Account":
      return "账户";
    default:
      return "首页";
  }
};

const BottomTabs: React.FC<IProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f86442",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "首页" }}
      />
      <Tab.Screen
        name="Listen"
        component={Listen}
        options={{ tabBarLabel: "我听" }}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={{ tabBarLabel: "发现" }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ tabBarLabel: "我的" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
