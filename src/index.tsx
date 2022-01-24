import Navigator from "@/navigator/index";
import { Provider } from "react-redux";
import store from "@/config/dva";
import { StatusBar } from "react-native";
import "@/config/http";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Main() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
    </Provider>
  );
}
