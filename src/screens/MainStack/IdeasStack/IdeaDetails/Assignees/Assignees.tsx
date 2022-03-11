import React, { useMemo } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import Assignee from "screens/MainStack/IssuesStack/ShowIssue/Assignee";
import styles from "styles/cardDetails";

import { Idea, User } from "store/internal/types";
import { useFetchProfileQuery } from "store/github/slice";
import { useAssignUserToIdeaMutation } from "store/internal/slice";
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
  id: Idea["id"];
  users?: Idea["users"];
};

export const Assignees = ({ id, users }: Props) => {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id;

  const [assignUser, { isLoading: isAssigning }] =
    useAssignUserToIdeaMutation();

  const assignToMe = useMemo(() => {
    if (!userId || users?.find((u) => u.id === userId)) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          assignUser({ ideaId: id, userId });
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
