import { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import {
  Box,
  Text,
  Center,
  Spinner,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import Footer from "./Footer";
import getUser from "../../hooks/getHooks/getUserName";
import ContentGrid from "./ContentGrid";
import Filters from "./Filters";
import { MdLogin } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
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
  const handleSignIn = () => {
    location.href = "/sign-up";
  };
  const { user, isLoaded } = useUser();
  const { data: userData, isLoading: userIsLoading } = getUser({ user_id });
  const userName = userData?.username;
  const { data: contentData, isLoading: contentIsLoading } =
    getContent(contentFilters);
  if (!isLoaded)
    return (
      <Center>
        <Spinner />
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
            <VStack>
              <Text fontSize={"3xl"}>Our Users' Database</Text>
              {!user && isLoaded && (
                <Text fontSize={"xl"}>
                  Please{" "}
                  <Button
                    width={100}
                    rightIcon={<MdLogin />}
                    colorScheme="blue"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>{" "}
                  for the Full Experience!
                </Text>
              )}
            </VStack>
          </Center>
        )}
        <Filters
          selectedFilter={
            contentFilters.filter !== undefined ? contentFilters.filter : ""
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
          searchQuery={contentFilters?.title}
        />
      </Box>
      <Footer user_id={user_id} />
    </>
  );
};

export default RenderContent;
