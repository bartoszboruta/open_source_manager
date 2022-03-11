import { Text, SearchBar, Button, FAB } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { View, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useEffect, useMemo } from "react";

import { useFetchIssuesQuery } from "store/internal/slice";
import IssueCard from "../IssueCard";

import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { selectCurrentUser } from "store/auth/authSlice";
import { matchSorter } from "match-sorter";
import {
  availableFilterOptions,
  clearIssueSearch,
  setIssueSearch,
  setIssuesFilter,
} from "store/filtering/slice";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import searchStyles from "styles/search";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Issues = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const currentUser = useSelector(selectCurrentUser);

  const search = useSelector(
    (state: RootState) => state.filtering.issues.search
  );

  const selectedFilter: Filter = useSelector(
    (state: RootState) => state.filtering.issues.filter
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
    useFetchIssuesQuery(args);

  const resultsToDisplay = useMemo(() => {
    if (data) {
      return matchSorter(data, search, { keys: ["name", "description"] });
    }
    return data || [];
  }, [search, data]);

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
    dispatch(setIssueSearch(text || ""));
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
        onClear={() => dispatch(clearIssueSearch())}
      />
      <SegmentedControl
        values={availableFilterOptions}
        selectedIndex={availableFilterOptions.findIndex(
          (elem) => elem === selectedFilter
        )}
        onChange={(event) => {
          dispatch(
            setIssuesFilter(
              availableFilterOptions[event.nativeEvent.selectedSegmentIndex]
            )
          );
        }}
        style={styles.segmentControll}
      />
      <FlatList
        data={resultsToDisplay}
        extraData={[search, selectedFilter]}
        renderItem={({ item }) => <IssueCard issue={item} />}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        size="large"
        onPress={() => navigation.navigate("AddIssue")}
      />
    </>
  );
};

export default Issues;
