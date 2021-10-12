import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import AddIdea from "./AddIdea";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="AddIdea" component={AddIdea} />
  </Stack.Navigator>
);
