import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import AddIssue from "./AddIssue";
import EditIssue from "./EditIssue";
import ShowIssue from "./ShowIssue";

export type IssueStackParamList = {
  List: undefined;
  AddIssue: undefined;
  EditIssue: undefined;
  ShowIssue: { issueId: string };
};

const Stack = createStackNavigator<IssueStackParamList>();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="AddIssue" component={AddIssue} />
    <Stack.Screen name="EditIssue" component={EditIssue} />
    <Stack.Screen name="ShowIssue" component={ShowIssue} />
  </Stack.Navigator>
);
