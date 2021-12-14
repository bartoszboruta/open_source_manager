import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 22,
    color: "red",
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "red",
  },
  handle: {
    fontSize: 60,
    color: "gray",
    marginBottom: 30,
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
