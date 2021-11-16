import React from "react";
import { Text } from "react-native";
import IssueForm from "../../../../components/IssueForm";
import { useFetchIssueQuery } from "../../../../store/internal/slice";

export const EditIssue = ({ route }) => {
  const { issueId } = route?.params;
  const { data, isLoading, isError, error, refetch, isFetching, isSuccess } =
    useFetchIssueQuery(Number(issueId));

  if (isLoading || !isSuccess) {
    return <Text>Czekaj na mnie!</Text>;
  }

  return <IssueForm issue={data} />;
};

export default EditIssue;
