import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddIssue from "./AddIssue";
import BackArrow from "components/BackArrow";
import EditIssue from "./EditIssue";
import List from "./List";
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
    <Stack.Screen
      options={{ headerShown: false }}
      name="List"
      component={List}
    />
    <Stack.Screen
      name="AddIssue"
      component={AddIssue}
      options={({ navigation }) => ({
        title: "Add Issue",
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="EditIssue"
      component={EditIssue}
      options={({ navigation }) => ({
        title: `Edit Issue`,
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="ShowIssue"
      component={ShowIssue}
      options={({ navigation }) => ({
        title: `Issue`,
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);
