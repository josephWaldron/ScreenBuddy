import { Content } from "../ContentGrid";
import { Box, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  content: Content;
}

const ContentCard = ({ content }: Props) => {
  return (
    <Card
      width={{ base: "200px", md: "220px" }}
      height={{ base: "400px", md: "450px" }}
      alignItems="center"
      justifyContent="center"
    >
      <Image src={content.image_url} alt={content.title} objectFit="contain" />
      <CardBody>
        <Heading fontSize={18} paddingBottom={2}>
          {content.title}
        </Heading>
        <Box
          position="absolute"
          bottom={3}
          left="50%"
          transform="translateX(-50%)"
        >
          <Text>{content.rating}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
