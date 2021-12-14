import React, { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Input } from "react-native-elements";

import schema, { LoginSchema } from "./schema";
import { setCredentials } from "store/auth/authSlice";
import { useAppDispatch } from "store";
import { useLoginMutation } from "store/internal/slice";
import { View } from "react-native";

const initialValues: LoginSchema = { name: "", password: "" };

const Form = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, { data, isLoading, error }] = useLoginMutation();

  console.log({ error });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data.user, token: data.token }));
    }
  }, [data, dispatch, setCredentials]);

  const handleSubmit = useCallback(
    (values) => {
      loginMutation({ email: values.name, password: values.password });
    },
    [loginMutation]
  );

  const { submitForm, values, errors, handleChange } = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  return (
    <View>
      <Input
        value={values.name}
        onChangeText={handleChange("name")}
        placeholder="Enter name"
        label="Name"
        errorMessage={errors.name || error?.data?.email}
      />
      <Input
        value={values.password}
        onChangeText={handleChange("password")}
        placeholder="Enter password"
        label="Password"
        errorMessage={errors.password || error?.data?.password}
      />
      <Button loading={isLoading} onPress={submitForm} title="Login" />
    </View>
  );
};

export default Form;
