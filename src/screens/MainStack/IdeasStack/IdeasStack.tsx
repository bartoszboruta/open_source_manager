import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddIdea from "./AddIdea";
import BackArrow from "components/BackArrow";
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
    <Stack.Screen
      options={{ headerShown: false }}
      name="List"
      component={List}
    />
    <Stack.Screen
      name="AddIdea"
      component={AddIdea}
      options={({ navigation, route }) => ({
        title: "Add Idea",
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="IdeaDetails"
      component={IdeaDetails}
      options={({ navigation, route }) => ({
        title: 'Idea Details',
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="EditIdea"
      component={EditIdea}
      options={({ navigation, route }) => ({
        title: `Edit ${route.params?.idea?.name}`,
        headerShown: true,
        headerLeft: () => <BackArrow navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);
