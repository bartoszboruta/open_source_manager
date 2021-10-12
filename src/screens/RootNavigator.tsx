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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM0MDQ1MDY0LCJleHAiOjE2MzQ5MDkwNjQsImp0aSI6IjJiNGJjMjQ5LTc1MTEtNGQ1Yy1hMTY1LTU3ZjEzMjlkNmUyYSJ9.g4BlKE5W092mBaaluCWmi0fLnxWlAY1jm4MRuNgx0TU",
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
