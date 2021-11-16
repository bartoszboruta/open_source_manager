import { useContext } from "react";

import { AuthContext, AuthContextProps } from "../contexts";

type ReturnDataType = {
  token: string | null;
};

export const useAuth: () => ReturnDataType = () => {
  const { token } = useContext(AuthContext) as AuthContextProps;

  const returnObject: ReturnDataType = {
    token,
  };

  return returnObject;
};

export default useAuth;
