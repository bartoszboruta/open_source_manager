import React, { useCallback } from "react";
import { Formik, Field } from "formik";

import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

import TextField from "components/Form/TextField";

import schema, { RegisterSchema } from "./schema";

const initialValues: RegisterSchema = {
  email: "",
  github_name: "",
  password: "",
  confirmed_password: "",
};

const Form = () => {
  const submitForm = useCallback((values) => {
    console.log({ values });
    // todo: connect with login slice
  }, []);

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
              label="Github name"
              name="github_name"
              placeholder="Enter Github name"
              component={TextField}
            />
            <Field
              label="Email"
              name="email"
              placeholder="Enter email"
              component={TextField}
            />
            <Field
              name="password"
              label="Passowrd"
              placeholder="Enter password"
              component={TextField}
              secureTextEntry={true}
            />
            <Field
              name="confirmed_password"
              label="Confirm passowrd"
              placeholder="Enter password"
              component={TextField}
              secureTextEntry={true}
            />
            <Button onPress={() => handleSubmit()} title="Register" />
          </>
        );
      }}
    </Formik>
  );
};

export default Form;
