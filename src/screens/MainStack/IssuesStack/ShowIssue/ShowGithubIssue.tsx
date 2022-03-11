import React from "react";
import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";

import styles from "styles/cardDetails";
import { useFetchGithubIssueQuery } from "store/github/slice";
import GithubAssignees from "./GithubAssignees";

const ShowGithubIssue = ({ owner, repo, issueNumber }) => {
  const {
    data: githubData,
    isLoading,
    isError,
    error,
  } = useFetchGithubIssueQuery({
    owner,
    repo,
    issueNumber,
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error {JSON.stringify(error)}</Text>;
  }

  return (
    <View>
      {githubData?.body ? (
        <>
          <Text style={styles.header}>GITHUB DESCRIPTION</Text>
          <Markdown>{githubData?.body}</Markdown>
        </>
      ) : null}

      {githubData?.assignees?.length && githubData.assignees ? (
        <>
          <Text style={styles.header}>GITHUB ASSIGNEES</Text>
          <GithubAssignees assignees={githubData.assignees} />
        </>
      ) : null}
    </View>
  );
};

export default ShowGithubIssue;
