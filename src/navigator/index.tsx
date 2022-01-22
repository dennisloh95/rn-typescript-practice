import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import Detail from "@/pages/Detail";
import { Platform, StyleSheet } from "react-native";

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
          options={{ headerTitle: "首页" }}
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
