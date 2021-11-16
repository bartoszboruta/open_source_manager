import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";

import { useFetchProfileQuery } from "../../../store/github/slice";

const Profile = () => {
  const { data, error, isLoading } = useFetchProfileQuery({
    name: "marektro",
  });
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loader}>
          data is being loaded, have patience my friend
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Found an error: {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.handle}>{data.login}</Text>
      <Image style={styles.avatar} source={{ uri: data.avatar_url }}></Image>
      <Text style={styles.name}>{data.name}</Text>
    </View>
  );
};
export default Profile;
