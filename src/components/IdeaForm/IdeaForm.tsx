import { Input, Button } from "react-native-elements";
import { Text, View } from "react-native";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { FC } from "react";

import {
  useCreateIdeaMutation,
  useUpdateIdeaMutation,
} from "store/internal/slice";
import { Idea } from "store/internal/types";
import { selectCurrentUser } from "store/auth/authSlice";

import styles from "../IssueForm/styles";

type Props = {
  idea?: Idea;
};

const IdeaForm: FC<Props> = ({
  idea = {
    description: "",
    name: "",
    github_url: "",
    status: "",
  },
}) => {
  const { goBack } = useNavigation();

  const [createIdea, { isLoading: isCreating }] = useCreateIdeaMutation();
  const [updateIdea, { isLoading: isUpdating }] = useUpdateIdeaMutation();

  const user = useSelector(selectCurrentUser);
  const isUpdate = !!idea?.id;

  const sendForm = (values: Partial<Idea>) => {
    const { creator, ...restValues } = values;
    isUpdate
      ? updateIdea({ ...restValues, creator_id: creator?.id })
          .then(() => {
            goBack();
          })
          .catch(() => {
            console.log("error");
          })
      : createIdea({ ...values, creator_id: user?.id })
          .then(goBack)
          .catch(() => {
            console.log("error");
          });
  };

  const { submitForm, values, errors, touched, handleChange } = useFormik<
    Partial<Idea>
  >({
    initialValues: idea,
    onSubmit: sendForm,
  });

  return (
    <View style={styles.wrapper}>
      <Input
        value={values.name}
        onChangeText={handleChange("name")}
        placeholder="Idea name"
      />
      <Input
        value={values.description}
        onChangeText={handleChange("description")}
        placeholder="Description"
      />

      <Input
        value={values.github_url}
        onChangeText={handleChange("github_url")}
        placeholder="Github Repo"
      />
      <Input
        value={values.status}
        onChangeText={handleChange("status")}
        placeholder="Status"
      />
      <Button
        onPress={submitForm}
        title={isUpdate ? "Update Me!" : "Create Me!"}
        icon={
          isCreating || isUpdating ? (
            <Ionicons color="white" size={25} name="rocket-outline" />
          ) : undefined
        }
      />
    </View>
  );
};

export default IdeaForm;
