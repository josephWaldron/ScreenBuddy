import { useState } from "react";
import getContent from "../../hooks/getHooks/getContent";
import {
  Box,
  Text,
  Center,
  Spinner,
  VStack,
  Button,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import Footer from "./Footer";
import getUser from "../../hooks/getHooks/getUserName";
import ContentGrid from "./ContentGrid";
import Filters from "./Filters";
import { MdLogin } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { CopyIcon } from "@chakra-ui/icons";
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
  const toast = useToast();

  const handleShare = () => {
    const url = `${location.origin}/${user_id}`;
    navigator.clipboard.writeText(url);

    toast({
      title: "Profile Link Copied!",
      description: "Share it with your friends!",
      duration: 2000,
      isClosable: false,
      position: "bottom",
    });
  };

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
            <Text padding={5} fontSize={"3xl"}>
              {userName}'s Profile
            </Text>
            <Tooltip label="Copy link to clipboard">
              <Button
                leftIcon={<CopyIcon />}
                colorScheme={"blue"} // change color scheme based on state
                onClick={handleShare}
              >
                Share
              </Button>
            </Tooltip>
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
function toast(arg0: {
  title: string;
  description: string;
  duration: number;
  isClosable: boolean;
  position: string;
}) {
  throw new Error("Function not implemented.");
}
