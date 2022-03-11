import React, { FC } from "react";
import { Button } from "react-native-elements";
import { Text, TouchableOpacity, ScrollView } from "react-native";

import styles from "styles/cardDetails";
import { openLink } from "utils/linking";
import { useFetchIssueQuery } from "store/internal/slice";

import Assignees, { AssigneeWithGithubData } from "./Assignees";
import ShowGithubIssue from "./ShowGithubIssue";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { IssueStackParamList } from "../IssuesStack";
import StatusBadge from "components/StatusBadge";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/auth/authSlice";

interface IProps {
  route: RouteProp<IssueStackParamList, "ShowIssue">;
  navigation: NavigationProp<any>;
}

export const ShowIssue: FC<IProps> = ({ route, navigation }) => {
  const { issueId } = route.params;
  const user = useSelector(selectCurrentUser);

  const { data, isLoading, isError, error } = useFetchIssueQuery(
    Number(issueId)
  );

  console.log(data);

  React.useLayoutEffect(() => {
    if (user?.id === data?.creator.id) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate("EditIssue", { issueId })}
            title="Edit"
          />
        ),
      });
    }
  }, [navigation, user, data]);

  React.useLayoutEffect(() => {
    if (data) {
      navigation.setOptions({
        title: `Issue #${data.github_issue_number}`
      });
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error {JSON.stringify(error)}</Text>;
  }

  const createLink = (user: string, repo: string, issue: number) => () => {
    const link = `https://github.com/${user}/${repo}/issues/${issue}`;
    openLink(link);
  };

  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.header}>GITHUB</Text>
      <TouchableOpacity
        onPress={createLink(
          data!.github_owner,
          data!.github_repository,
          data!.github_issue_number
        )}
      >
        <Text style={styles.link}>{data?.github_repository}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>DESCRIPTION</Text>
      <Text>{data?.description}</Text>
      <Assignees id={issueId} users={data?.users} />

      <Text style={styles.header}>STATUS</Text>
      <StatusBadge status={data?.status} />
      {data?.creator ? (
        <>
          <Text style={styles.header}>AUTHOR</Text>
          <AssigneeWithGithubData user={data?.creator} />
        </>
      ) : null}
      <ShowGithubIssue
        owner={data?.github_owner}
        repo={data?.github_repository}
        issueNumber={data?.github_issue_number}
      />
    </ScrollView>
  );
};

export default ShowIssue;
