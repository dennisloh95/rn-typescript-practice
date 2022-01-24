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
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import Detail from "@/pages/Detail";
import { Platform, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  // switch (routeName) {
  //   case "HomeTabs":
  //     return "Home";
  //   case "Listen":
  //     return routeName;
  //   case "Found":
  //     return routeName;
  //   case "Account":
  //     return routeName;
  //   default:
  //     return "Home";
  // }
  switch (routeName) {
    case "HomeTabs":
      return "";
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
  const insets = useSafeAreaInsets();

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
          headerStatusBarHeight:
            Platform.OS === "ios" ? insets.top : StatusBar.currentHeight,
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
            headerTransparent:
              getFocusedRouteNameFromRoute(route) === "HomeTabs" ? true : false,
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
