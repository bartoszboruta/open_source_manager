import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Form from "./Form";

import { common } from "styles";

type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={common.container}>
        <KeyboardAvoidingView>
          <MaterialIcon
            style={styles.icon}
            color={"#00ace6"}
            size={65}
            name="key"
          />

          <Form />
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={common.center}
          >
            <Text style={StyleSheet.flatten([common.url, common.wrapperMd])}>
              Do not have account? Register for free
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    marginBottom: 20,
    textAlign: "center",
  },
});
