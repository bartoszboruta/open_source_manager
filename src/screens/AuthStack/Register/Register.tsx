import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { common } from '../../../styles';

import Form from "./Form";

type Props = {};

const Register: React.FC<Props> = () => {
  return (
    <View style={common.container}>
      <Form />
    </View>
  );
};

export default Register;
