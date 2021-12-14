import React, { useCallback, useEffect } from "react";
import { Formik, Field } from "formik";

import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

import TextField from "components/Form/TextField";
import { useLogin } from "hooks";

import schema, { LoginSchema } from "./schema";
import { setCredentials } from "store/auth/authSlice";
import { useAppDispatch } from "store";

const initialValues: LoginSchema = { name: "", password: "" };

const Form = () => {
  const dispatch = useAppDispatch();
  const { login, data, isSuccess, isLoading } = useLogin();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data.user, token: data.token }));
    }
  }, [data]);

  console.log({ data });

  const submitForm = useCallback(
    (values) => {
      login({ email: values.name, password: values.password });
    },
    [login]
  );

  return (
    <Formik
      validateOnChange={false}
      onSubmit={submitForm}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {({ handleSubmit }) => {
        return (
          <>
            <Field
              label="Name"
              name="name"
              placeholder="Enter name"
              component={TextField}
            />
            <Field
              name="password"
              label="Passowrd"
              placeholder="Enter password"
              component={TextField}
              secureTextEntry={true}
            />
            <Button onPress={() => handleSubmit()} title="Login" />
          </>
        );
      }}
    </Formik>
  );
};

export default Form;
