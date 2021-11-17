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
  const navigation = useNavigation<any>()
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.header}>DESCRIPTION</Text>
      <Text>{description}</Text>
      <Text style={styles.header}>GITHUB 
      </Text>
      <TouchableOpacity onPress={() => openLink(github_url)}>
        <Text style={styles.link}>{github_url}</Text>
      </TouchableOpacity>
      <Text style={styles.header} >STATUS</Text>
      <Text >{status}</Text>
      <Text style={styles.header}>AUTHOR</Text>
        <Text>{creator.github_name}</Text>
      <Button
        buttonStyle={styles.button}
        title="Edit"
        type="outline"
        onPress={()=>navigation.navigate("EditIdea", {idea: props.route.params?.idea})}
      />
    </View>
  );
}
