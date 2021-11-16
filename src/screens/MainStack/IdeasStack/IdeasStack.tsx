import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import List from "./List";
import AddIdea from "./AddIdea";
import IdeaDetails, { IdeaDetailsProps } from "./IdeaDetails";
import { Icon } from "react-native-elements";

type IdeasParamList = {
  IdeaDetails: { idea: { name: string } };
  List: undefined;
  AddIdea: undefined;
};

const Stack = createStackNavigator<IdeasParamList>();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="AddIdea" component={AddIdea} />
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
  </Stack.Navigator>
);
