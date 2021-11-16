import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { setCredentials } from "../../src/store/authSlice";
import { useAppDispatch } from "../store";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM3MDU5NjAxLCJleHAiOjE2Mzc5MjM2MDEsImp0aSI6ImE0ZTNmN2RhLTYxNDUtNDgyNi1hOTQzLTNjZjc4NGFkYjUxOSJ9.x1qy2TJ-NH7K1uKzi2qt_z1DJqpBer90CNWPhBPe9zY",
      })
    );
  }, []);

  return (
    <NavigationContainer>
      {false ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
