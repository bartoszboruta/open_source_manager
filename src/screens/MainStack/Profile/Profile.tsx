import React from "react";
import { Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useFetchProfileQuery } from "../../../store/github/slice";
import { selectCurrentUser } from '../../../store/auth/authSlice';

import { styles } from "./styles";
import { useAuth } from "hooks";

const Profile = () => {
  const { resetCredentials } = useAuth();
  const user = useSelector(selectCurrentUser)
  const { data, error, isLoading } = useFetchProfileQuery({
    name: user!.github_name
  });

  const handleLogout = () => {
    resetCredentials();
  }


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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> 
      <View style={styles.headerUser}>
        <Image style={styles.avatar} source={{ uri: data.avatar_url }}></Image>
        <Text style={styles.handle}>{data.login}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={30} color="black" />
      </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
