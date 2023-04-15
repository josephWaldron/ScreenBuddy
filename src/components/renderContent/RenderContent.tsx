import React, { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
export interface contentFilters {
  user_id?: string;
  category?: string;
  filter?: string;
  search?: string;
  page?: number;
}

interface Props {
  user_id?: string;
}

const RenderContent = (props: Props) => {
  const [contentFilters, setContentFilters] = useState<contentFilters>(
    {} as contentFilters
  );
  const { data, error, isLoading } = getContent(contentFilters);
  console.log(data);
  return (
    <>
      {props.user_id && <div>Content for user {props.user_id}</div>}
      <div>filter Tabs</div>
      <div>content Grid</div>
      <div>footer</div>
    </>
  );
};

export default RenderContent;
