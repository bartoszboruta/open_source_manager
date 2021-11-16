export type RegisterRequestInterface = {
  email: string;
  github_name: string;
  password: string;
  confirmed_password: string;
};

export type RegisterResponse = {
  email: string;
  id: number;
  github_name: string;
};
