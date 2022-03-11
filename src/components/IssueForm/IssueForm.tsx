import { useFormik } from "formik";
import * as Clipboard from "expo-clipboard";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { FC, useState } from "react";

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
  const [error, setError] = useState<null | true>(null);
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

  const { submitForm, values, errors, touched, handleChange, setFieldValue } =
    useFormik<Partial<Issue>>({
      initialValues: issue,
      onSubmit: sendForm,
    });

  const getClipboardContent = async () => {
    const content = await Clipboard.getStringAsync();
    const regex = /^https:\/\/github.com\/[^/]*\/[^/]*\/issues\/\d+$/;
    const isValidLink = regex.test(content);

    if (!isValidLink) {
      setError(true);
      return;
    }

    const usernameFromLinkRegex = /github.com\/(.*)[\\\/]\d+/;

    const xd = content.match(usernameFromLinkRegex);
    //@ts-ignore
    const username = xd[1].split("/")[0];

    const matches = content.match(/([^\/]+)\/issues\/(\d+)$/);
    //@ts-ignore
    const [, repo, issue] = matches;

    if (!username || !repo || !issue) {
      setError(true);
      return;
    }

    setError(null);
    setFieldsFromClipboard(repo, username, issue);
  };

  const setFieldsFromClipboard = async (
    repo: string,
    owner: string,
    issue: number
  ) => {
    setFieldValue("github_repository", repo);
    setFieldValue("github_owner", owner);
    setFieldValue("github_issue_number", String(issue));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={getClipboardContent}
          style={styles.pasteButton}
        >
          <Text>Paste from clipboard</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>Invalid Format</Text>}
      </View>
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
        style={{ flex: 1 }}
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
