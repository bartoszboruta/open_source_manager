import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./List";
import AddIdea from "./AddIdea";
import IdeaDetails from "./IdeaDetails";
import { Icon } from "react-native-elements";
import EditIdea from "./EditIdea/EditIdea";

type IdeasParamList = {
  IdeaDetails: { idea: { name: string } };
  List: undefined;
  AddIdea: undefined;
  EditIdea: { idea: { name: string } };
};

const Stack = createStackNavigator<IdeasParamList>();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="AddIdea" component={AddIdea}       options={({ navigation, route }) => ({
        title: "Add Idea",
        headerShown: true,
        headerLeft: () => (
          <Icon
            iconStyle={{ marginLeft: 8 }}
            name="arrow-back-ios"
            onPress={() => navigation.goBack()}
          />
        ),
      })}/>
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
