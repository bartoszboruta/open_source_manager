import { useEffect } from "react";
import { saveUserData } from "../utils";

import {
  useRegisterMutation,
  RegisterRequestInterface,
  RegisterResponse,
} from "../store/register";

type ReturnHookDataType = {
  register: (args: RegisterRequestInterface) => void;
  data?: RegisterResponse;
  isSuccess: boolean;
};

export const useRegister: () => ReturnHookDataType = () => {
  const [registerMutation, { data, isSuccess, ...hookRest }] =
    useRegisterMutation();

  console.log({ hookRest });

  const register: (args: RegisterRequestInterface) => void = (args) => {
    console.log(args);
    registerMutation(args);
  };

  useEffect(() => {
    const asyncEffect: (data: RegisterResponse) => void = async (data) => {
      await saveUserData({
        githubName: data.github_name,
        userEmail: data.email,
        userId: data.id,
      });
    };
    if (isSuccess && data) {
      asyncEffect(data);
    }
  }, [isSuccess && data]);

  const returnObject = {
    register,
    data,
    isSuccess,
    ...hookRest,
  };

  return returnObject;
};

export default useRegister;
