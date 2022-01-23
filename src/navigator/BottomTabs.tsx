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
import { AntDesign } from "@expo/vector-icons";

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
        options={{
          tabBarLabel: "首页",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: "我听",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="staro" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={{
          tabBarLabel: "发现",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
