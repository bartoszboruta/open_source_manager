import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import AddIssue from "./AddIssue";
import EditIssue from "./EditIssue";
import ShowIssue from "./ShowIssue";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="AddIssue" component={AddIssue} />
    <Stack.Screen name="EditIssue" component={EditIssue} />
    <Stack.Screen name="ShowIssue" component={ShowIssue} />
  </Stack.Navigator>
);
