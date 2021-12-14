import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import React from "react";

import AddIdea from "./AddIdea";
import EditIdea from "./EditIdea/EditIdea";
import IdeaDetails from "./IdeaDetails";
import List from "./List";

type IdeasParamList = {
  AddIdea: undefined;
  EditIdea: { idea: { name: string } };
  IdeaDetails: { idea: { name: string } };
  List: undefined;
};

const Stack = createStackNavigator<IdeasParamList>();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen
      name="AddIdea"
      component={AddIdea}
      options={({ navigation, route }) => ({
        title: "Add Idea",
        headerShown: true,
        headerLeft: () => (
          <Icon
            iconStyle={{ marginLeft: 8 }}
            name="arrow-back-ios"
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    />
    <Stack.Screen
      name="IdeaDetails"
      component={IdeaDetails}
      options={({ navigation, route }) => ({
        title: route.params?.idea?.name,
        headerShown: true,
        headerLeft: () => (
          <Icon
            iconStyle={{ marginLeft: 8 }}
            name="arrow-back-ios"
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    />
    <Stack.Screen
      name="EditIdea"
      component={EditIdea}
      options={({ navigation, route }) => ({
        title: route.params?.idea?.name,
        headerShown: true,
        headerLeft: () => (
          <Icon
            iconStyle={{ marginLeft: 8 }}
            name="arrow-back-ios"
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);
