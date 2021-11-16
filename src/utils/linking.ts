import { Linking } from "react-native";

export const openLink = (link: string) => {
  const httpLink = link.includes("http") ? link : `https://${link}`;
  Linking.canOpenURL(httpLink).then((supported) => {
    if (supported) {
      Linking.openURL(httpLink);
    } else {
      console.log("Don't know how to open URI: " + httpLink);
    }
  });
};
