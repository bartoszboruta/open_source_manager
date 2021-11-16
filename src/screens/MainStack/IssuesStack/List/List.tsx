import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, SearchBar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useFetchIssuesQuery } from "../../../../store/internal/slice";
import IssueCard from "../IssueCard";

export const Issues = () => {
  const [search, setSearch] = React.useState("");
  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchIssuesQuery("");

  if (isLoading) {
    return (
      <View style={styles.errorWrapper}>
        <Ionicons color="blue" size={25} name="refresh-outline" />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorWrapper}>
        <Ionicons color="purple" size={25} name="warning-outline" />
        <Text style={styles.error}>Problem with fetching issues</Text>
        <Text style={styles.error}>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <>
      <SearchBar
        lightTheme
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <IssueCard
            owner={item?.github_owner}
            repo={item?.github_repository}
            issueNumber={item?.github_issue_number}
          />
        )}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorWrapper: {
    marginTop: 50,

    alignItems: "center",
  },
  error: {
    fontSize: 15,
    marginTop: 15,
    color: "purple",
  },
  loading: {
    fontSize: 15,
    marginTop: 15,
    color: "blue",
  },
});

export default Issues;
