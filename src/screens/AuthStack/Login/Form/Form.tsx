import React, { useCallback } from "react";
import { Formik, Field } from "formik";

import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

import TextField from "components/Form/TextField";

import schema, { LoginSchema } from "./schema";

const initialValues: LoginSchema = { name: "", password: "" };

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
