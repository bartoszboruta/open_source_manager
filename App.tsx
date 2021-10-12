import * as React from "react";
import RootNavigator from "./src/screens/RootNavigator";
import store from "./src/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
