import { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import { Box, Text, Center, Spinner } from "@chakra-ui/react";
import Footer from "./Footer";
import getUser from "../../hooks/getHooks/getUserName";
import ContentGrid from "./ContentGrid";
import Filters from "./Filters";
export interface contentFilters {
  user_id?: string; //if user_id is not provided get all content
  content_type?: string;
  title?: string; //if title is not provided get all content
  filter?: string;
}

interface Props {
  user_id: string;
}

const RenderContent = ({ user_id }: Props) => {
  const [contentFilters, setContentFilters] = useState<contentFilters>({
    user_id: user_id,
  });
  const { data: userData, isLoading: userIsLoading } = getUser({ user_id });
  const userName = userData?.username;
  const { data: contentData, isLoading: contentIsLoading } =
    getContent(contentFilters);
  if (userIsLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  if (!contentData && !contentIsLoading)
    return (
      <Box flex="1">
        <Center>
          <Text fontSize={"4xl"}>No Content Found for user: {userName}</Text>
        </Center>
        <Footer user_id={user_id} />
      </Box>
    );
  return (
    <>
      <Box flex="1">
        {userName ? (
          <Center>
            <Text fontSize={"3xl"}>{userName}'s Profile</Text>
          </Center>
        ) : (
          <div></div>
        )}
        <Filters
          selectedFilter={
            contentFilters.filter !== undefined
              ? contentFilters.filter
              : ""
          }
          onFilter={(selectedFilter) =>
            setContentFilters({ ...contentFilters, filter: selectedFilter })
          }
          onSearch={(searchText) => {
            setContentFilters({ ...contentFilters, title: searchText });
          }}
          onSelectType={(type) =>
            setContentFilters({ ...contentFilters, content_type: type })
          }
        />

        <ContentGrid
          isLoading={contentIsLoading}
          contentArray={contentData}
          user_id={user_id}
        />
      </Box>
      <Footer user_id={user_id} />
    </>
  );
};

export default RenderContent;
