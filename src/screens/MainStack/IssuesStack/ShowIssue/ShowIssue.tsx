import React from "react";
import { Text, Button } from "react-native-elements";
import { useFetchIssueQuery } from "../../../../store/internal/slice";

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

  return <Text>Issue Description: {data?.description}</Text>;
};

export default ShowIssue;
