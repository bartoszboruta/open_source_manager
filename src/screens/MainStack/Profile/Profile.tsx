import React from "react";
import { Button, View } from "react-native";

import { useAppDispatch } from "store";
import { setCredentials } from "store/auth/authSlice";
import { clearStorage, getToken, getUserData } from "utils";

const Profile = () => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Button
        title="CheckTokens"
        onPress={async () => {
          const token = await getToken();
          const userData = await getUserData();
          console.log("STORED TOKEN", token);
          console.log("STORED USER DATA", userData);
        }}
      />
      <Button
        title="ClearTokens"
        onPress={async () => {
          await clearStorage();
          dispatch(setCredentials({ token: "", user: null }));
        }}
      />
    </View>
  );
};

export default Profile;
