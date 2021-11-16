import * as React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Idea } from "../../../../store/internal/types";
import styles from "./styles";

type IdeaCardProps = {
  idea: Idea;
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { description, name, github_url, status, creator } = idea;
  const navigation = useNavigation<any>();

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Text numberOfLines={2}>{description}</Text>
      <Text>created by: {creator.github_name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("IdeaDetails", { idea })}
      >
        <Text>Show Details</Text>
      </TouchableOpacity>
    </Card>
  );
}
