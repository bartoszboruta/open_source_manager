import React from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { openLink } from "utils/linking";

import styles from "styles/cardDetails";
import { GithubIssue } from "store/github/types";

type Props = {
  assignee: GithubIssue["assignees"][number];
};

const Assignee: React.FC<Props> = ({ assignee }) => {
  return (
    <TouchableOpacity
      key={assignee.login}
      onPress={() => {
        openLink(assignee.html_url);
      }}
      style={styles.assignee}
    >
      <Image source={{ uri: assignee.avatar_url }} style={styles.avatar} />
      <Text style={styles.assigneeName} key={assignee.id}>
        {assignee.login}
      </Text>
    </TouchableOpacity>
  );
};

export default Assignee;
