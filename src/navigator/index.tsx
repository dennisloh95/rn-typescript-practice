import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  StackScreenProps,
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import Detail from "@/pages/Detail";
import { Platform, StyleSheet, StatusBar } from "react-native";

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function getHeaderTitle(route: RouteProp<RootStackParamList, "BottomTabs">) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeTabs";
  switch (routeName) {
    case "HomeTabs":
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
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "float",
          headerTitleAlign: "center",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStatusBarHeight: StatusBar.currentHeight,
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}
      >
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerTitle: "详情页" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
