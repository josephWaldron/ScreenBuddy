import { Content } from "../ContentGrid";
import { Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  content: Content;
}

const ContentCard = ({ content }: Props) => {
  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100%"
      >
        <Image
          src={content.image_url}
          alt={content.title}
          objectFit="contain"
          mb={4}
        />
        <Heading
          fontSize={18}
          textAlign="center"
          height="3.6rem"
          paddingBottom={2}
          isTruncated
          whiteSpace="normal"
          display="-webkit-box"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {content.title}
        </Heading>
        <Flex flexGrow={1} />
        <Box mb={3} textAlign="center">
          <Text>{content.rating}</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default ContentCard;
