import React, { useMemo } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import Assignee from "./Assignee";
import styles from "styles/cardDetails";

import { Issue, User } from "store/internal/types";
import { useFetchProfileQuery } from "store/github/slice";
import { useAssignUserToIssueMutation } from "store/internal/slice";
import { selectCurrentUser } from "store/auth/authSlice";

export const AssigneeWithGithubData = ({ user }: { user: User }) => {
  const { data, isLoading } = useFetchProfileQuery({
    name: user!.github_name,
  });

  if (isLoading || !data) {
    return null;
  }

  return <Assignee assignee={data} />;
};

type Props = {
  id: Issue["id"];
  users?: Issue["users"];
};

export const Assignees = ({ id, users }: Props) => {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id;

  const [assignUser, { isLoading: isAssigning }] =
    useAssignUserToIssueMutation();

  const assignToMe = useMemo(() => {
    if (!userId || users?.find((u) => u.id === userId)) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          assignUser({ issueId: id, userId });
        }}
      >
        <Text style={styles.link}>
          {users?.length ? "Assign to me" : "No one - assign to me"}
        </Text>
      </TouchableOpacity>
    );
  }, [userId, id, users]);

  return (
    <>
      <Text style={styles.header}>ASSIGNEES</Text>
      {isAssigning ? <Text>Assigning...</Text> : assignToMe}
      {users?.map((user) => {
        return <AssigneeWithGithubData key={user.id} user={user} />;
      })}
    </>
  );
};

export default Assignees;
