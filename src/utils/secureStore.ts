import * as SecureStore from "expo-secure-store";
import { User } from "store/internal/types";

export const saveToken: (value: string) => void = async (value) => {
  await SecureStore.setItemAsync("authorizationToken", value);
};

export const saveUserData = async (userInput: User) => {
  const userData = JSON.stringify(userInput);
  await SecureStore.setItemAsync("user_data", userData);
};

export const getUserData: () => Promise<User> = async () => {
  const rawUserData = (await SecureStore.getItemAsync("user_data")) as string;
  const userData = JSON.parse(rawUserData) as User;

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
