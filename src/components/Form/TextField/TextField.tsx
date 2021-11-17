import React from "react";
import { TextInputProps } from "react-native";
import { FieldProps } from "formik";
import { Input, InputProps } from "react-native-elements";

const TextField: React.FC<InputProps & TextInputProps & FieldProps> = ({
  field,
  form,
  placeholder,
  secureTextEntry,
  autoCapitalize = "none",
  label,
}) => {
  const error = form.errors[field.name] as string | undefined;

  return (
    <Input
      label={label}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onChangeText={(value) => form.setFieldValue(field.name, value)}
      onBlur={() => form.setFieldTouched(field.name)}
      errorMessage={error}
    />
  );
};

export default TextField;
