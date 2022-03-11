import { StyleSheet } from "react-native";

export default StyleSheet.create({
  badge: {
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    fontWeight: "600",
    overflow: "hidden",
    width: 70,
    textAlign: "center",
    fontSize: 10,
  },
  badgeNew: {
    borderColor: "#6666FF",
    color: "#6666FF",
    textTransform: "uppercase",
    backgroundColor: "#e8e8ff",
  },
  badgeAssigned: {
    borderColor: "#FFA500",
    color: "#FFA500",
    textTransform: "uppercase",
    backgroundColor: "#FFDB99",
  },
  badgeDone: {
    borderColor: "#00CC99",
    color: "#005641",
    textTransform: "uppercase",
    backgroundColor: "#7FE5CC",
  },
});
