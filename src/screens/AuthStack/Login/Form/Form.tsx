import React, { useCallback, useEffect } from "react";
import { Formik, Field } from "formik";

import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

import TextField from "components/Form/TextField";

import schema, { LoginSchema } from "./schema";
import { setCredentials } from "store/auth/authSlice";
import { useAppDispatch } from "store";
import { useLoginMutation } from "store/internal/slice";

const initialValues: LoginSchema = { name: "", password: "" };

const Form = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, { data, isLoading, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data.user, token: data.token }));
    }
  }, [data]);

  const submitForm = useCallback(
    (values) => {
      loginMutation({ email: values.name, password: values.password });
    },
    [loginMutation]
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
            <Button
              loading={isLoading}
              onPress={() => handleSubmit()}
              title="Login"
            />
          </>
        );
      }}
    </Formik>
  );
};

export default Form;
