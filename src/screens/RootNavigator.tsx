import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { selectCurrentToken, setCredentials } from "store/auth/authSlice";
import { useAppSelector } from "store";

// enum EnumType {
//   xs = "xs",
//   s = "s",
// }

// type ObjType = {
//   [key in keyof typeof EnumType]: number;
// };

// const obj: ObjType = {
//   xs: 1,
//   s: 2,
// };

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "hooks";

const RootNavigator = () => {
  const token = useAppSelector(selectCurrentToken);
  console.log({ token });

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
