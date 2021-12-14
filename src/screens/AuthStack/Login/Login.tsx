import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Form from "./Form";

import { common } from "styles";

type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={common.container}>
      <Form />
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={common.center}
      >
        <Text style={StyleSheet.flatten([common.url, common.wrapperMd])}>
          Do not have account? Register for free
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
