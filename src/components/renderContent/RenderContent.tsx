import React, { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import { Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import Footer from "./Footer";
export interface contentFilters {
  user_id?: string; //if user_id is not provided get all content
  category: string; //if category is not provided get all content catagories
  title: string; //if title is not provided get all content
  filter: string; //filter can be rating, date, or abc ascending or descending
}

interface Props {
  user_id?: string;
}

const RenderContent = (props: Props) => {
  const [contentFilters, setContentFilters] = useState<contentFilters>({
    user_id: props.user_id,
    category: "all",
    title: "",
    filter: "date_asc",
  });
  return (
    <>
      <Box flex="1">
        {props.user_id && <div>Content for user {props.user_id}</div>}
        <div>filter Tabs</div>
        <div>content Grid</div>
      </Box>
      <Box bgColor={"green.800"} height={900}></Box>
      <Box as="footer" mt="auto" bgColor={"gray.900"}>
        <Footer user_id={props.user_id} />
      </Box>
    </>
  );
};

export default RenderContent;
