import * as React from "react";
import RootNavigator from "./src/screens/RootNavigator";
import store from "./src/store";
import { Provider } from "react-redux";

import { AuthProvider } from "./src/contexts";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </AuthProvider>
  );
}
