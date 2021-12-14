import React from "react";
import { Text, View } from "react-native";

import { Idea } from "store/internal/types";

type Props = {
  idea?: Idea;
};

const IdeaForm = (props: Props) => {
  const { idea } = props;

  return (
    <View>
      <Text>{idea ? `Edit Form of ${idea?.name}` : "New Idea Form"}</Text>
    </View>
  );
};

export default IdeaForm;
