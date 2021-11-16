import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, SearchBar, Button, FAB } from "react-native-elements";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useFetchIssuesQuery } from "../../../../store/internal/slice";
import IssueCard from "../IssueCard";

import styles from "./styles";

export const Issues = () => {
  const navigation = useNavigation<any>();
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
        <Button
          onPress={refetch}
          icon={<Ionicons color="white" size={20} name="refresh-outline" />}
          title="Reload"
        />
      </View>
    );
  }

  const navigateToIssue = (itemId: number) => () => {
    navigation.navigate("ShowIssue", { issueId: itemId });
  };

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
          <Text>{item.description}</Text>
        )}
        refreshing={isFetching}
        onRefresh={refetch}
      />
      <FAB
        size="large"
        title="+"
        placement="right"
        onPress={() => navigation.navigate("AddIssue")}
      />
    </>
  );
};

export default Issues;
