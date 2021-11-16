import { StyleSheet } from "react-native";

export default StyleSheet.create({
  errorWrapper: {
    marginTop: 50,

    alignItems: "center",
  },
  error: {
    fontSize: 15,
    marginTop: 15,
    color: "purple",
  },
  loading: {
    fontSize: 15,
    marginTop: 15,
    color: "blue",
  },
  refresh: {
    backgroundColor: "white",
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
  },
});
