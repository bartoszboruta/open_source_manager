import { StyleSheet } from "react-native";

import spacing from "./spacing";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    padding: 35,
    flex: 1,
    justifyContent: "center",
  },
  url: {
    textDecorationLine: "underline",
  },
  wrapperMd: {
    padding: spacing.md,
  },
});

export default styles;
