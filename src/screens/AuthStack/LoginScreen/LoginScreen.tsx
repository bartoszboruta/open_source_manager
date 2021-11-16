import React from "react";
import { Text, Button } from "react-native-elements";

import { useLoginMutation } from "../../../store/login/loginSlice";

export default () => {
  const [loginRequest, { data, isError, isLoading, error, isSuccess }] =
    useLoginMutation();

  console.log("DATA", data);
  console.log("IS ERROR", isError);
  console.log("IS LOADING", isLoading);
  console.log("ERROR", error);
  console.log("IS SUCCESS", isSuccess);

  return (
    <>
      <Text h1>Login screen</Text>
      <Text h3>{JSON.stringify(data)}</Text>
      <Button
        title="login action"
        onPress={() => loginRequest({ email: "bb8t", password: "123456" })}
      />
    </>
  );
};
