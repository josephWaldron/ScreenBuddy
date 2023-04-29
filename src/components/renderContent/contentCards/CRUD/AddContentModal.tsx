import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Flex,
  Box,
  Text,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { Content } from "../../ContentGrid";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useUser } from "@clerk/clerk-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
}

const AddContentModal = ({ isOpen, onClose, content }: Props) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { user } = useUser();
  const handleSubmission = (content: Content, user_rating: number) => {
    if (user) {
      console.log("user_id: ", user.id);
      console.log("content: ", content);
      console.log("rating: ", user_rating);
    }
  };

  const stars = [1, 2, 3, 4, 5].map((starValue) => {
    const isFilled = starValue <= ((hover ?? rating) as number);

    const handleClick = () => {
      setRating(starValue);
    };

    const handleMouseOver = () => {
      setHover(starValue);
    };

    const handleMouseLeave = () => {
      setHover(null);
    };

    return (
      <Box
        as="span"
        key={starValue}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        color={isFilled ? "gold" : "gray.400"}
        fontSize="2em"
        cursor="pointer" // Add this line
      >
        {isFilled ? <BsStarFill /> : <BsStar />}
      </Box>
    );
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add {content.title} to Your List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={content.image_url}
            alt={content.title}
            objectFit="contain"
            mb={4}
            borderRadius={10}
          />
          <Center>
            <Text fontSize="xl" fontWeight="bold">
              Your Rating
            </Text>
          </Center>
          <Flex justifyContent="center" alignItems="center" marginBottom={4}>
            {stars}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Tooltip
            label={
              rating
                ? "Add to Your List"
                : "Please select a rating before adding to your list"
            }
            placement="top"
          >
            <Button
              colorScheme="green"
              isDisabled={!rating}
              onClick={() => {
                handleSubmission(content, rating as number);
                onClose();
              }}
              style={{ marginRight: "10px" }}
            >
              Add to List
            </Button>
          </Tooltip>

          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddContentModal;
