import React from "react";

import { GithubIssue } from "store/github/types";

import Assignee from "./Assignee";

export const GithubAssignees = ({ assignees }: GithubIssue) => {
  return (
    <>
      {assignees.map((assignee) => {
        return <Assignee assignee={assignee} key={assignee.id} />;
      })}
    </>
  );
};

export default GithubAssignees;
