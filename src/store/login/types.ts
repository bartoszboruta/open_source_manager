export type LoginRequestParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  github_name: string;
};
