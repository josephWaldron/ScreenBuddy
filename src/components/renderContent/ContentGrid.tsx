import React from "react";
import { contentFilters } from "./RenderContent";
import getContent from "../../hooks/getHooks/getContent";
import { Center, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import CardSkeleton from "./contentCards/CardSkeleton";
import CardContainer from "./contentCards/CardContainer";
import ContentCard from "./contentCards/ContentCard";

export interface Content {
  id: number;
  title: string;
  rating: number;
  image_url: string;
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
        columns={{ base: 2, sm: 2, md: 4, lg: 8 }}
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
    <SimpleGrid
      columns={{ base: 2, sm: 2, md: 4, lg: 8 }}
      spacing={2}
      padding={2}
    >
      {contentArray.map((content) => (
        <CardContainer key={content.id}>
          <ContentCard content={content} />
        </CardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ContentGrid;
