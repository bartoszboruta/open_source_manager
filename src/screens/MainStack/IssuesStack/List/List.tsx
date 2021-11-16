import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, SearchBar, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useFetchIssuesQuery } from "../../../../store/internal/slice";

export const Issues = () => {
  const [search, setSeatch] = React.useState("");
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

  return (
    <>
      <SearchBar
        lightTheme
        placeholder="Search"
        onChangeText={setSeatch}
        value={search}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}</Text>
          </View>
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
  refresh: {
    backgroundColor: "white",
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
  },
});

export default Issues;
