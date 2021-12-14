import React from "react";

import IdeaForm from "components/IdeaForm";
import { IdeaDetailsProps } from "../IdeaDetails/IdeaDetails";

export const EditIdea = (props: IdeaDetailsProps) => {
  const { idea } = props.route?.params;

  return <IdeaForm idea={idea} />;
};

export default EditIdea;
