import React, { useCallback } from "react";
import { View } from "react-native";

import { common } from "styles";

import Form from "./Form";

const Login = () => {
  return (
    <View style={common.container}>
      <Form />
    </View>
  );
};

export default Login;
