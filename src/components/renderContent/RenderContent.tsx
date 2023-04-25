import React, { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import Footer from "./Footer";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
export interface contentFilters {
  user_id?: string; //if user_id is not provided get all content
  category: string; //if category is not provided get all content catagories
  title: string; //if title is not provided get all content
  filter: string; //filter can be rating, date, or abc ascending or descending
}

interface Props {
  user_id?: string;
  home?: boolean;
}

const RenderContent = (props: Props) => {
  const [contentFilters, setContentFilters] = useState<contentFilters>({
    user_id: props.user_id,
    category: "all",
    title: "",
    filter: "date_asc",
  });
  //if home is true

  //const { data, error, isLoading } = getContent(contentFilters);
  // console.log(data);
  return (
    <>
      {props.user_id && <div>Content for user {props.user_id}</div>}
      <div>filter Tabs</div>
      <div>content Grid</div>
    </>
  );
};

export default RenderContent;
