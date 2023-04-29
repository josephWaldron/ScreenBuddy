import { Box, SimpleGrid, Center, Text, Tooltip } from "@chakra-ui/react";
import CardSkeleton from "./contentCards/CardSkeleton";
import CardContainer from "./contentCards/CardContainer";
import ContentCard from "./contentCards/ContentCard";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export interface Content {
  id: number;
  title: string;
  rating: number;
  image_url: string;
  content_type: string;
}

interface Props {
  isLoading?: boolean;
  contentArray: Content[];
  user_id?: string;
}

const ContentGrid = ({ isLoading, contentArray, user_id }: Props) => {
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  if (!contentArray && isLoading)
    return (
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 6, "2xl": 10 }}
        spacing={2}
        padding={2}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <CardSkeleton />
            </CardContainer>
          ))}
      </SimpleGrid>
    );

  return (
    <>
      <Center>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Click on a card to add it to your list!
        </Text>
        <Tooltip label="If you cant find it here click the Add Content button.">
          <QuestionOutlineIcon color="white" marginLeft={2} />
        </Tooltip>
      </Center>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 6, "2xl": 10 }}
        spacing={2}
        padding={2}
      >
        {contentArray.map((content) => (
          <CardContainer key={content.id}>
            <ContentCard content={content} user_id={user_id} />
          </CardContainer>
        ))}
      </SimpleGrid>
      <Box height={20}></Box>
    </>
  );
};

export default ContentGrid;
