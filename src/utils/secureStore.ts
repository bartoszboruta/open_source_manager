import * as SecureStore from "expo-secure-store";

type UserData = {
  userEmail: string;
  userId: number;
  githubName: string;
};

export const saveToken: (value: string) => void = async (value) => {
  await SecureStore.setItemAsync("authorizationToken", value);
};

export const saveUserData: ({
  userEmail,
  userId,
  githubName,
}: {
  userEmail: string;
  userId: number;
  githubName: string;
}) => void = async ({ githubName, userEmail, userId }) => {
  const userData = JSON.stringify({ userEmail, userId, githubName });
  await SecureStore.setItemAsync("user_data", userData);
};

export const getUserData: () => Promise<UserData> = async () => {
  const rawUserData = (await SecureStore.getItemAsync("user_data")) as string;
  const userData = JSON.parse(rawUserData) as UserData;

  return userData;
};

export const getToken: () => Promise<string | null> = async () => {
  let result = await SecureStore.getItemAsync("authorizationToken");
  if (result) {
    return result;
  } else {
    return result;
  }
};

export const clearStorage: () => void = async () => {
  await SecureStore.deleteItemAsync("authorizationToken");
  await SecureStore.deleteItemAsync("user_data");
};
