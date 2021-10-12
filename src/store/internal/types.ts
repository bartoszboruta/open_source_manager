type RegisterResponse = {};

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
  users: User[];
};
