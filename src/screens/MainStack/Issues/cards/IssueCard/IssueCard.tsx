import * as React from "react";
import { Text } from "react-native";
import { useFetchIssueQuery } from "../../../../../store/github/slice";

type IssueCardProps = {
  owner: string;
  repo: string;
  issueNumber: number;
};

export default function IssueCard({
  owner,
  repo,
  issueNumber,
}: IssueCardProps) {
  const { isLoading, data, error } = useFetchIssueQuery({
    owner,
    repo,
    issueNumber,
  });
  console.log(isLoading, data, error);
  return <Text>{data ? data?.body : ""}</Text>;
}
