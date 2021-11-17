import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useFetchIssueQuery } from "../../../../store/internal/slice";
import { Idea } from "../../../../store/internal/types";
import { openLink } from "../../../../utils/linking";
import styles from "./styles";

export const ShowIssue = ({ route, navigation }) => {
  const { issueId } = route?.params;

  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchIssueQuery(Number(issueId));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("EditIssue", { issueId })}
          title="Edit"
        />
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error {JSON.stringify(error)}</Text>;
  }

  return (
    data && (
      <View style={styles.pageContainer}>
        <Text style={styles.header}>DESCRIPTION</Text>
        <Text>{data?.description}</Text>
        <Text style={styles.header}>GITHUB</Text>
        <TouchableOpacity onPress={() => openLink(data.github_repository)}>
          <Text style={styles.link}>{data.github_repository}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>STATUS</Text>
        <Text>{data.status}</Text>
        <Text style={styles.header}>AUTHOR</Text>
        <Text>{data.creator.github_name}</Text>
      </View>
    )
  );
};

export default ShowIssue;
