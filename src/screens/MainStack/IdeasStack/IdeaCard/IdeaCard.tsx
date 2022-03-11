import { Card } from "react-native-elements";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import React from "react";

import { Idea } from "store/internal/types";

import styles from "styles/card";
import StatusBadge from "components/StatusBadge";

type IdeaCardProps = {
  idea: Idea;
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { description, name, creator } = idea;
  const navigation = useNavigation<any>();

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Text numberOfLines={2}>{description}</Text>
      <View style={styles.detailsContainer}>
        <View>
          <Text>created by:</Text>
          <Text>{creator.github_name}</Text>
        </View>
        <StatusBadge status={idea.status} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("IdeaDetails", { idea_id: idea.id })
          }
        >
          <Text style={styles.details}>Show Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
