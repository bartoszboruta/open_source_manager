import { Button } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";

import { useFetchIdeaQuery } from "store/internal/slice";
import { openLink } from "utils/linking";

import styles from "styles/cardDetails";
import StatusBadge from "components/StatusBadge";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/auth/authSlice";

export type IdeaDetailsProps = {
  route: RouteProp<{ params: { idea_id: number } }, "params">;
};

export default function IdeaDetails(props: IdeaDetailsProps) {
  const id = props.route.params?.idea_id;
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isError, error, refetch } = useFetchIdeaQuery(id);
  const navigation = useNavigation<any>();

  useFocusEffect(useCallback(refetch, []));

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error {JSON.stringify(error)}</Text>;
  }

  if (!data) return null;

  const isOwner = user!.id === data.creator.id;

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.header}>DESCRIPTION</Text>
      <Text>{data.description}</Text>
      <Text style={styles.header}>GITHUB</Text>
      <TouchableOpacity onPress={() => openLink(data.github_url)}>
        <Text style={styles.link}>{data.github_url}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>STATUS</Text>
      <StatusBadge status={data.status} />
      <Text style={styles.header}>AUTHOR</Text>
      <Text>{data.creator.github_name}</Text>
      {isOwner ? (
        <Button
        buttonStyle={styles.button}
        title="Edit"
        type="outline"
        onPress={() => navigation.navigate("EditIdea", { idea: data })}
      />
      ) : null}
      
    </View>
  );
}
