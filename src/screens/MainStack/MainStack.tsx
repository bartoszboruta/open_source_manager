import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Issues" component={() => null} />
    <Tab.Screen name="Ideas" component={() => null} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
