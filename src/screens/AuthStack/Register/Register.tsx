import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { common } from "styles";

import Form from "./Form";

type Props = {};

const Register: React.FC<Props> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={common.container}>
        <KeyboardAvoidingView>
          <Form />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
