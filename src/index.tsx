import Navigator from "@/navigator/index";
import { Provider } from "react-redux";
import store from "@/config/dva";

export default function Main() {
  return (
    <Provider store={store}>
      {" "}
      <Navigator />
    </Provider>
  );
}
