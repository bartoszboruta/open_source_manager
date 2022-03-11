import React, { useCallback } from "react";
import { Formik, Field } from "formik";
import { Button } from "react-native-elements";

import TextField from "components/Form/TextField";
import { useRegisterMutation } from "store/internal/slice";

import schema, { RegisterSchema } from "./schema";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const initialValues: RegisterSchema = {
  email: "",
  github_name: "",
  password: "",
  confirmed_password: "",
};

const Form = () => {
  const navigation = useNavigation();
  const [registerMutation, { data, isLoading, isError, error }] =
    useRegisterMutation();

  const submitForm = useCallback((values) => {
    registerMutation(values);
  }, []);

  return (
    <>
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
              <Button
                loading={isLoading}
                onPress={() => handleSubmit()}
                title="Register"
              />
            </>
          );
        }}
      </Formik>
      <Button
        title="Login"
        type="clear"
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      ></Button>
    </>
  );
};

export default Form;
