import { NavigationState } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const hp = (percentage: number) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};

const getActiveRouteName = (state: NavigationState) => {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
};

export { viewportWidth, viewportHeight, wp, hp, getActiveRouteName };
