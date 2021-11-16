import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { Idea } from "../../../../store/internal/types";
import { openLink } from "../../../../utils/linking";
import { Button } from "react-native-elements";
import styles from "./styles";

export type IdeaDetailsProps = {
  route: RouteProp<{ params: { idea: Idea } }, "params">;
};

export default function IdeaDetails(props: IdeaDetailsProps) {
  const { description, github_url, status, creator } = props.route.params?.idea;
  const navigation = useNavigation();

  return (
    <View>
      <Text>{description}</Text>
      <Text>{status}</Text>
      <TouchableOpacity onPress={() => openLink(github_url)}>
        <Text>{github_url}</Text>
      </TouchableOpacity>
      <Text>{creator.github_name}</Text>
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Edit"
        type="outline"
      />
    </View>
  );
}