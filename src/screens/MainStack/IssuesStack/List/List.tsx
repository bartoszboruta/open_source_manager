import { Text, SearchBar, Button, FAB } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { View, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback } from "react";

import { useFetchIssuesQuery } from "store/internal/slice";
import IssueCard from "../IssueCard";

import styles from "./styles";

export const Issues = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = React.useState("");
  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchIssuesQuery("");

  useFocusEffect(useCallback(refetch, []));

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
        renderItem={({ item }) => <IssueCard issue={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item) => String(item.id)}
      />
      <FAB
        icon={{ name: 'add', color: 'white' }}
        placement="right"
        size="large"
        onPress={() => navigation.navigate("AddIssue")}
      />
    </>
  );
};

export default Issues;
