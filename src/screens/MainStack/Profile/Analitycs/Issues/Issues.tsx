import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import {
  useFetchIssuesByUserQuery,
  useFetchIssuesAssignedToQuery,
} from "store/internal/slice";
import { selectCurrentUser } from "store/auth/authSlice";

const ProfileAnalitycsIssues = () => {
  const user = useSelector(selectCurrentUser);
  const { data: createdData, isLoading: isLoadingCreated, error: errorCreated } = useFetchIssuesByUserQuery(user!.id);
  const { data: assignedData, isLoading: isLoadingAssigned, error: errorAssigned } = useFetchIssuesAssignedToQuery(user!.id);

  const isLoading = isLoadingCreated || isLoadingAssigned;
  const error = errorCreated || errorAssigned;

  if (isLoading) {
    return <Text>data is being loaded, have patience my friend</Text>;
  }

  if (error) {
    return <Text>Found an error: {JSON.stringify(error)}</Text>;
  }

  const createdIssuesNumber = createdData!.length;
  const assignedIssuesNumber = assignedData!.length;

  return (
    <View>
      <Text style={styles.header}>Created Issues</Text>
      <Text>{createdIssuesNumber}</Text>
      <Text style={styles.header}>Assigned Issues</Text>
      <Text>{assignedIssuesNumber}</Text>
    </View>
  );
};

export default ProfileAnalitycsIssues;

const styles = StyleSheet.create({
  header: {
    color: "#a1a1a1",
    marginTop: 20,
    marginBottom: 8,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
  },
});
