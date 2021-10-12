import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { setCredentials } from "../../src/store/authSlice";
import { useAppDispatch } from "../store";

import AuthStack from "./AuthStack";
import MainStack from "./AuthStack";

const RootNavigator = () => {
  const [isAuth] = useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(
      setCredentials({
        user: {
          id: 1,
          github_name: "tobob",
          email: "bozek.wojciech@gmail.com",
        },
        token:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM0MDI5ODA0LCJleHAiOjE2MzQwMzE2MDQsImp0aSI6ImIyZGI3ZGE1LWRhMTAtNDkxNC1iNzE2LTUzZDg3ZTQ4MjYyNSJ9.cjvEbUMSQVtgNVN7wKTvw4qoCwDTad769Z3r7yfC4ss",
      })
    );
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
