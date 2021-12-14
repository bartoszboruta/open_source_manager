import React, { useCallback, useContext, useEffect } from "react";
import { Formik, Field } from "formik";

import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

import TextField from "components/Form/TextField";

import schema, { LoginSchema } from "./schema";
import { useLoginMutation } from "store/internal/slice";
import { AuthContext } from "contexts";

const initialValues: LoginSchema = { name: "", password: "" };

const Form = () => {
  const { setCredentials } = useContext(AuthContext);
  const [loginMutation, { data, isLoading, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (data) {
      console.log(data);
      setCredentials(data?.token, data?.user);
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
