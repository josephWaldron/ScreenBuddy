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
  Text,
  Center,
  Tooltip,
  Spinner,
  useToast,
  FormControl,
  Input,
} from "@chakra-ui/react";

import { Content } from "../../ContentGrid";
import { useUser } from "@clerk/clerk-react";
import addUserRating from "../../../../hooks/postHooks/addUserRating";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
}

const AddContentModal = ({ isOpen, onClose, content }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleSubmission = async (content: Content, user_rating: number) => {
    if (user) {
      setIsLoading(true);
      console.log("type ", content.content_type);
      try {
        const res = await addUserRating({
          user_id: user.id,
          content_id: content.id,
          title: content.title,
          image_url: content.image_url,
          content_type: content.content_type,
          rating: content.rating,
          user_rating: user_rating,
        });
        setIsLoading(false);
        toast({
          title: "Rating added to your list!",
          description: `${content.title} has been added to your list with a rating of ${user_rating} / 10 🍿`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onClose();
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setRating(parseFloat(value.toFixed(2))); // Round to 2 decimal places before setting state
    } else {
      setRating(0);
    }
  };

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
              Your Rating {rating} / 10 🍿
            </Text>
          </Center>
          <Flex justifyContent="center" alignItems="center" marginBottom={4}>
            <FormControl>
              <Input
                type="number"
                id="rating"
                name="rating"
                step="0.01" // Change this line
                min="0"
                max="10"
                value={rating ? rating : ""}
                onChange={handleRatingChange}
                placeholder="Enter a rating (0-10) 🍿"
              />
            </FormControl>
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
              width={150}
              onClick={() => {
                handleSubmission(content, rating as number);
              }}
              style={{ marginRight: "10px" }}
            >
              {isLoading ? (
                <Spinner size="sm" color="white" mr={2} />
              ) : (
                "Add to List"
              )}
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
