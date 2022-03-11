import { StyleSheet } from "react-native";

const PADDING = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  error: {
    fontSize: 22,
    color: "red",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "red",
  },
  body: {
    padding: PADDING,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: PADDING,
  },
  headerUser: {
    alignItems: "center",
    flexDirection: "row",
  },
  handle: {
    color: "gray",
    fontSize: 30,
    marginLeft: 10,
  },
  name: {
    fontSize: 30,
    color: "gray",
    marginTop: 30,
  },
  loader: {
    fontSize: 50,
    color: "green",
  },
});
