import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { FC } from "react";

import { Issue } from "store/internal/types";
import { selectCurrentUser } from "store/auth/authSlice";
import {
  useCreateIssueMutation,
  useFetchIssueQuery,
  useUpdateIssueMutation,
} from "store/internal/slice";

import styles from "./styles";
//TODO change into yup!
interface IssueFormProps {
  issue?: Partial<Issue>;
}

const IssueForm: FC<IssueFormProps> = ({ issue = {} }) => {
  const { goBack } = useNavigation();
  const [createIssue, { isLoading: isCreating }] = useCreateIssueMutation();
  const [updateIssue, { isLoading: isUpdating }] = useUpdateIssueMutation();
  const { refetch } = useFetchIssueQuery(Number(issue.id));
  const user = useSelector(selectCurrentUser);

  const isUpdate = !!issue.id;
  const sendForm = (values: Partial<Issue>) => {
    const { creator, users: _users, ...restValues } = values;
    if (isUpdate) {
      updateIssue({ ...restValues, creator_id: creator?.id })
        .then(() => {
          // TODO refetch after success mutation
          refetch();
          goBack();
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      createIssue({ ...values, creator_id: user?.id }).then(goBack);
    }
  };

  const { submitForm, values, errors, touched, handleChange } = useFormik<
    Partial<Issue>
  >({
    initialValues: issue,
    onSubmit: sendForm,
  });

  return (
    <View style={styles.wrapper}>
      <Input
        value={values.description}
        onChangeText={handleChange("description")}
        placeholder={"Description"}
      />

      <Input
        value={values.github_repository}
        onChangeText={handleChange("github_repository")}
        placeholder={"Github Repo"}
      />

      <Input
        value={values.github_owner}
        onChangeText={handleChange("github_owner")}
        placeholder={"Github Owner"}
      />

      <Input
        value={values.github_issue_number?.toString()}
        onChangeText={handleChange("github_issue_number")}
        placeholder={"Github Issue Number"}
      />

      <Input
        value={values.status}
        onChangeText={handleChange("status")}
        placeholder={"Status"}
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

export default IssueForm;
