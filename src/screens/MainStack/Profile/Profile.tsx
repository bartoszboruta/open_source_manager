import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";

import { useFetchProfileQuery } from "../../../store/github/slice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks";
import { AuthContext } from "contexts";

const Profile = () => {
  const { resetCredentials } = useContext(AuthContext);
  const { data, error, isLoading } = useFetchProfileQuery({
    name: "marektro",
  });
  const dispatch = useDispatch();

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
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => resetCredentials?.()}
      >
        <Text style={styles.handle}>{data.login}</Text>
        <Image style={styles.avatar} source={{ uri: data.avatar_url }}></Image>
        <Text style={styles.name}>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
