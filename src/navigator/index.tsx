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
import Category from "@/pages/Category";
import Album from "@/pages/Album";
import { Platform, StyleSheet, StatusBar } from "react-native";
import { Animated } from "react-native";

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
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

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, "Album">;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: 0,
    },
    headerBackground: () => {
      return <Animated.View style={styles.headerBackground}></Animated.View>;
    },
  };
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: "返回",
          headerTintColor: "#333",
          headerBackTitleVisible: false,
          headerMode: "float",
          headerTitleAlign: "center",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          ...Platform.select({
            android: {
              headerStatusBarHeight: StatusBar.currentHeight,
            },
          }),
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
          name="Category"
          component={Category}
          options={{ headerTitle: "分类" }}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={getAlbumOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: "#fff",
    opacity: 0,
  },
});

export default Navigator;
