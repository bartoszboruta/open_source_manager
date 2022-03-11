import React, { FC } from "react";
import { Text } from "react-native";

import styles from "./style";

const StatusBadge: FC<{ status?: string }> = ({ status }) => {
  const additionalBadgeStyle = () => {
    switch (status) {
      case "new":
        return styles.badgeNew;
      case "assigned":
        return styles.badgeAssigned;
      default:
        return styles.badgeDone;
    }
  };
  return (
    <Text style={[styles.badge, additionalBadgeStyle()]}>
      {status || "unknown"}
    </Text>
  );
};
export default StatusBadge;
