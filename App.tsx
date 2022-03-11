import * as React from "react";
import RootNavigator from "./src/screens/RootNavigator";
import store from "./src/store";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { AuthProvider } from "./src/contexts";

export default function App() {
  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </Provider>
    </ActionSheetProvider>
  );
}
