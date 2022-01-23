import Navigator from "@/navigator/index";
import { Provider } from "react-redux";
import store from "@/config/dva";
import { StatusBar } from "react-native";

export default function Main() {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
    </Provider>
  );
}
