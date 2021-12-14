import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useFormik } from "formik";
import { Input, Button } from "react-native-elements";

import { useRegisterMutation } from "store/internal/slice";

import schema, { RegisterSchema } from "./schema";
import { useNavigation } from "@react-navigation/core";

const initialValues: RegisterSchema = {
  email: "",
  github_name: "",
  password: "",
  confirmed_password: "",
};

const Form = () => {
  const navigation = useNavigation<any>();
  const [registerMutation, { error, isLoading, isSuccess }] =
    useRegisterMutation();

  const handleSubmit = useCallback(
    (values) => {
      registerMutation(values);
    },
    [registerMutation, navigation]
  );

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("Login");
    }
  }, [isSuccess, navigation.navigate]);

  const { submitForm, values, errors, handleChange } = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  return (
    <View>
      <Input
        value={values.github_name}
        onChangeText={handleChange("github_name")}
        placeholder="Enter Github name"
        label="Github name"
        errorMessage={errors.github_name || error?.data?.github_name}
      />
      <Input
        value={values.email}
        onChangeText={handleChange("email")}
        placeholder="Enter email"
        label="Email"
        errorMessage={errors.email || error?.data?.email}
      />
      <Input
        value={values.password}
        onChangeText={handleChange("password")}
        placeholder="Enter password"
        label="Passowrd"
        secureTextEntry={true}
        errorMessage={errors.password || error?.data?.password}
      />
      <Input
        value={values.confirmed_password}
        onChangeText={handleChange("confirmed_password")}
        placeholder="Enter password"
        label="Confirm passowrd"
        secureTextEntry={true}
        errorMessage={
          errors.confirmed_password || error?.data?.confirmed_password
        }
      />

      <Button loading={isLoading} onPress={submitForm} title="Register" />
    </View>
  );
};

export default Form;
