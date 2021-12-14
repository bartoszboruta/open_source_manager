import { Text, SearchBar, Button, FAB } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { View, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";

import IdeaCard from "../IdeaCard";
import { useFetchIdeasQuery } from "store/internal/slice";

export const Ideas = () => {
  const [search, setSeatch] = useState("");
  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchIdeasQuery("");
  const navigation = useNavigation<any>();

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

  const handleSearchChange: (text?: string) => any | void = (text) => {
    if (text) {
      setSeatch(text);
    }
  };

  return (
    <>
      <SearchBar
        lightTheme
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={search}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <IdeaCard idea={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item) => String(item.id)}
      />
      <FAB
        size="large"
        title="+"
        placement="right"
        onPress={() => navigation.navigate("AddIdea")}
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

export default Ideas;
