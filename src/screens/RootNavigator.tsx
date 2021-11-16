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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM3MDU0NjM5LCJleHAiOjE2Mzc5MTg2MzksImp0aSI6IjY0YjJiOTVjLWViN2EtNDgxOS04YTQ3LTJiNzIxNTAzMTc3YyJ9.AsKXNTOUkvvA9T-s3aH_aNexmiuVv470ADA0XG28CRQ",
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
