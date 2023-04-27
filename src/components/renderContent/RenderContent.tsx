import React, { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import { Box, HStack, Spacer, VStack, Text, Center } from "@chakra-ui/react";
import Footer from "./Footer";
import getAllUserNames from "../../hooks/getHooks/getUserName";
import getUser from "../../hooks/getHooks/getUserName";
export interface contentFilters {
  user_id?: string; //if user_id is not provided get all content
  category: string; //if category is not provided get all content catagories
  title: string; //if title is not provided get all content
  filter: string; //filter can be rating, date, or abc ascending or descending
}

interface Props {
  user_id: string | "home";
}

const RenderContent = ({ user_id }: Props) => {
  const [contentFilters, setContentFilters] = useState<contentFilters>({
    user_id: user_id,
    category: "all",
    title: "",
    filter: "date_asc",
  });
  const user = getUser({ user_id });
  const userName = user.data?.username;
  if (user.isLoading)
    return (
      <Center>
        <Text fontSize={"4xl"}>Loading...</Text>
      </Center>
    );

  return (
    <>
      <Box flex="1">
        {userName ? (
          <Center>
            <Text fontSize={"3xl"}>{userName}'s Profile</Text>
          </Center>
        ) : (
          <Center>
            <Text fontSize={"3xl"}>All Content</Text>
          </Center>
        )}
        <div>filter Tabs</div>
        <div>Content Grid</div>
      </Box>
      <Footer user_id={user_id} />
    </>
  );
};

export default RenderContent;
