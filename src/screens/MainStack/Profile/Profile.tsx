import React from "react";
import { Text, Button, View } from "react-native";
import { setCredentials } from "store/auth/authSlice";

import { useLogin, useRegister } from "../../../hooks";
import { clearStorage, getToken, getUserData } from "../../../utils";

const apiResponce = {
  login: "octocat",
  id: 1,
  node_id: "MDQ6VXNlcjE=",
  avatar_url: "https://github.com/images/error/octocat_happy.gif",
  gravatar_id: "",
  url: "https://api.github.com/users/octocat",
  html_url: "https://github.com/octocat",
  followers_url: "https://api.github.com/users/octocat/followers",
  following_url: "https://api.github.com/users/octocat/following{/other_user}",
  gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
  starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
  organizations_url: "https://api.github.com/users/octocat/orgs",
  repos_url: "https://api.github.com/users/octocat/repos",
  events_url: "https://api.github.com/users/octocat/events{/privacy}",
  received_events_url: "https://api.github.com/users/octocat/received_events",
  type: "User",
  site_admin: false,
  name: "monalisa octocat",
  company: "GitHub",
  blog: "https://github.com/blog",
  location: "San Francisco",
  email: "octocat@github.com",
  hireable: false,
  bio: "There once was...",
  twitter_username: "monatheoctocat",
  public_repos: 2,
  public_gists: 1,
  followers: 20,
  following: 0,
  created_at: "2008-01-14T04:33:35Z",
  updated_at: "2008-01-14T04:33:35Z",
};

const Profile = () => {
  const { login } = useLogin();
  const { register } = useRegister();
  return (
    <View>
      <Button
        title="Login"
        onPress={() => login({ email: "test123", password: "123456" })}
      />
      <Button
        title="Register"
        onPress={() =>
          register({
            email: "test210@wp.pl",
            confirmed_password: "123456",
            password: "123456",
            github_name: "test",
          })
        }
      />
      <Button
        title="CheckTokens"
        onPress={async () => {
          const token = await getToken();
          const userData = await getUserData();
          console.log("STORED TOKEN", token);
          console.log("STORED USER DATA", userData);
        }}
      />
      <Button
        title="ClearTokens"
        onPress={async () => {
          await clearStorage();
        }}
      />
    </View>
  );
};

export default Profile;
