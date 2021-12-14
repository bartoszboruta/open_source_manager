import { Card } from "react-native-elements";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import React from "react";

import { Issue } from "store/internal/types";

import styles from "./styles";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({ issue }: IssueCardProps) {
  const {
    id,
    description,
    status,
    creator,
    github_repository,
    github_issue_number,
  } = issue;
  const navigation = useNavigation<any>();

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{github_issue_number}</Card.Title>
      <Card.Divider />

      <Text numberOfLines={2}>{description}</Text>

      <View style={styles.detailsContainer}>
        <View>
          <Text>created by:</Text>
          <Text>{creator.github_name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShowIssue", { issueId: id })}
        >
          <Text style={styles.details}>Show Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
