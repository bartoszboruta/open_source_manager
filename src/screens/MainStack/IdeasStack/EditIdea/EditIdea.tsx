import React from "react";
import { Text } from "react-native";
import IdeaForm from "../../../../components/IdeaForm";
import { useFetchIssueQuery } from "../../../../store/internal/slice";
import {IdeaDetailsProps} from '../IdeaDetails/IdeaDetails'

export const EditIdea = (props: IdeaDetailsProps) => {
  const { idea } = props.route?.params;
  
  return <IdeaForm idea={idea} />;
};

export default EditIdea;
