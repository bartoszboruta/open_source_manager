import { Text, SearchBar, Button, FAB } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useMemo } from "react";
import { matchSorter } from "match-sorter";

import IdeaCard from "../IdeaCard";
import { useFetchIdeasQuery } from "store/internal/slice";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import {
  availableFilterOptions,
  clearIdeaSearch,
  setIdeaFilter,
  setIdeaSearch,
} from "store/filtering/slice";
import { selectCurrentUser } from "store/auth/authSlice";

import searchStyles from "styles/search";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Ideas = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const search = useSelector(
    (state: RootState) => state.filtering.ideas.search
  );

  const selectedFilter: Filter = useSelector(
    (state: RootState) => state.filtering.ideas.filter
  );

  const args = useMemo(() => {
    if (selectedFilter === "Assigned to me") {
      return `?q[users_id_in][]=${currentUser?.id}`;
    }
    if (selectedFilter === "Created by me") {
      return `?q[creator_id_in][]=${currentUser?.id}`;
    }
    return "";
  }, [selectedFilter]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchIdeasQuery(args);

  const resultsToDisplay = useMemo(() => {
    if (data) {
      return matchSorter(data, search, { keys: ["name", "description"] });
    }
    return data || [];
  }, [search, data]);

  const navigation = useNavigation<any>();

  useEffect(() => {
    refetch();
  }, [selectedFilter]);

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
    dispatch(setIdeaSearch(text || ""));
  };
  const { top } = useSafeAreaInsets();

  return (
    <>
      <SearchBar
        inputStyle={searchStyles.input}
        containerStyle={[searchStyles.containter, { marginTop: top }]}
        inputContainerStyle={searchStyles.iconContainer}
        lightTheme
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={search}
        onClear={() => dispatch(clearIdeaSearch())}
      />
      <SegmentedControl
        values={availableFilterOptions}
        selectedIndex={availableFilterOptions.findIndex(
          (elem) => elem === selectedFilter
        )}
        onChange={(event) => {
          dispatch(
            setIdeaFilter(
              availableFilterOptions[event.nativeEvent.selectedSegmentIndex]
            )
          );
        }}
        style={styles.segmentControll}
      />
      <FlatList
        data={resultsToDisplay}
        extraData={[search, selectedFilter]}
        renderItem={({ item }) => <IdeaCard idea={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        size="large"
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
  segmentControll: { marginHorizontal: 15 },
});

export default Ideas;
