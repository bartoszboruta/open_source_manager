import React, { createContext, FC, useEffect, useState } from "react";
import { setCredentials } from "store/auth/authSlice";
import { getToken } from "../utils";

export type AuthContextProps = {
  token: string | null;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const token = await getToken();

      if (token) {
        setToken(token);
      }
    };
    asyncEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
