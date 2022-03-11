import React, { createContext, FC, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { getToken, getUserData, saveToken, saveUserData } from "../utils";
import {
  setCredentials as storeSetCredentials,
  resetCredentials as storeResetCredential,
} from "store/auth/authSlice";
import { View, Text, StyleSheet } from "react-native";
import { User } from "store/internal/types";

export type AuthContextProps = {
  user: User | null;
  token: string | null;
  setCredentials: (token?: string, user?: User) => void;
  resetCredentials: () => void;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncEffect = async () => {
      const token = await getToken();
      const user = await getUserData();
      console.log(token, user);
      if (token && user) {
        setToken(token);
        setUser(user);
        dispatch(storeSetCredentials({ token, user }));
      }
      setLoading(false);
    };
    asyncEffect();
  }, []);

  const setCredentials = (token?: string, user?: User) => {
    if (token && user) {
      dispatch(storeSetCredentials({ token, user }));
      setToken(token);
      saveToken(token);

      setUser(user);
      saveUserData(user);
    }
  };

  const resetCredentials = () => {
    dispatch(storeResetCredential());
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Czekaj!</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, token, setCredentials, resetCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

const styles = StyleSheet.create({
  loading: {
    backgroundColor: "grey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontSize: 40, color: "white" },
});
