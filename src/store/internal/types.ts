export type User = {
  id: number;
  email: string;
  github_name: string;
};

export type Issue = {
  id: number;
  description: string;
  github_owner: string;
  github_repository: string;
  github_issue_number: number;
  status: string;
  creator: User;
  creator_id: number;
  users: User[];
};

export type Idea = {
  description: string;
  name: string;
  github_url: string;
  status: string;
  creator: User;
};

export type LoginRequestParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  github_name: string;
};

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
