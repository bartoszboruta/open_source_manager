import React from "react";
import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";

import { useFetchGithubIssueQuery } from "store/github/slice";

const ShowGithubIssue = () => {
  const {
    data: githubData,
    isLoading,
    isError,
    error,
  } = useFetchGithubIssueQuery({
    owner: "bartoszboruta",
    repo: "open_source_manager",
    issueNumber: 1,
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error {JSON.stringify(error)}</Text>;
  }

  return (
    <View>
      <Text>GITHUB DESCRIPTION</Text>
      <Markdown>{githubData?.body}</Markdown>
    </View>
  );
};

export default ShowGithubIssue;
