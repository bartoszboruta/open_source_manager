import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Profile from "./Profile";
import IssuesStack from "./IssuesStack";
import IdeasStack from "./IdeasStack";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "";

        if (route.name === "Issues") {
          iconName = "albums-outline";
        } else if (route.name === "Profile") {
          iconName = "person-circle-outline";
        } else if (route.name === "Ideas") {
          iconName = "bulb-outline";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    {/* <Tab.Screen name="Issues" component={IssuesStack} /> */}
    {/* <Tab.Screen name="Ideas" component={IdeasStack} /> */}
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
