import { StyleSheet } from "react-native";

import spacing from "./spacing";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    padding: spacing.xs,
  },
  url: {
    textDecorationLine: "underline",
  },
  wrapperMd: {
    padding: spacing.md,
  },
});

export default styles;
