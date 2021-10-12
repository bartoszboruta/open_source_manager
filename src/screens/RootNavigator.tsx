import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { setCredentials } from "../../src/store/authSlice";
import { useAppDispatch } from "../store";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const RootNavigator = () => {
  const [isAuth] = useState(true);
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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM0MDQxMDM4LCJleHAiOjE2MzQ5MDUwMzgsImp0aSI6ImJhNmYzYzY5LTJjNjEtNDgwYy1hMjIxLWFkNTllMDk1ZGVhNiJ9.ujH9cqvuRtCjlQaG2OuZYbwToqkzro2kigrca9S_nr0",
      })
    );
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
