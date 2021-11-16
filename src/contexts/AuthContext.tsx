import React, { createContext, FC, useEffect, useState } from "react";
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

  console.log("TOKEN SAVED", token);

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
