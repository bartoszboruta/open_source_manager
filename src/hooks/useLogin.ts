import {
  useLoginMutation,
  LoginRequestParams,
  LoginResponse,
} from "../store/login";

type ReturnHookDataType = {
  login: (args: LoginRequestParams) => void;
  data?: LoginResponse;
  isSuccess: boolean;
};

export const useLogin: () => ReturnHookDataType = () => {
  const [loginMutation, { data, isSuccess, ...hookRest }] = useLoginMutation();

  const login: (args: LoginRequestParams) => void = (args) => {
    loginMutation(args);
  };

  const returnObject = {
    login,
    data,
    isSuccess,
    ...hookRest,
  };

  return returnObject;
};

export default useLogin;
