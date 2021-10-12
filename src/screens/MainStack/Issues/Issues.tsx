import * as React from "react";
import IssueCard from "./cards/IssueCard";

export default function Issues() {
  return <IssueCard owner="octocat" repo="hello-world" issueNumber={42} />;
}
