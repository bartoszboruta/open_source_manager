import { useContext } from "react";

import { AuthContext, AuthContextProps } from "../contexts";

type ReturnDataType = {
  resetCredentials: () => void;
  token: string | null;
};

export const useAuth: () => ReturnDataType = () => {
  const { token, resetCredentials } = useContext(AuthContext) as AuthContextProps;

  const returnObject: ReturnDataType = {
    token,
    resetCredentials
  };

  return returnObject;
};

export default useAuth;
