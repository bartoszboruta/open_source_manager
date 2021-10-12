import React from "react";
import { Text, Button } from "react-native-elements";

import { useFetchIssuesQuery } from "../../../store/internal/slice";

export default () => {
  const { data, error, isLoading, isError } = useFetchIssuesQuery("");
  return (
    <>
      <Button title={isError ? "error" : "noError"} />
      <Text h1>Login screen</Text>
      <Text h3>{JSON.stringify(data)}</Text>
      {/* <Text h3>{JSON.stringify(error)}</Text> */}
    </>
  );
};
