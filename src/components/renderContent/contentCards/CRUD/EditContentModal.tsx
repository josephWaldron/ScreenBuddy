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
import updateUserRating from "../../../../hooks/putHooks/updateUserRating";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
  onRatingUpdated: (newRating: number) => void;
}

const EditContentModal = ({
  onRatingUpdated,
  isOpen,
  onClose,
  content,
}: Props) => {
  const [rating, setRating] = useState<number>(0);
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const isRatingSame = content.rating === rating;
  const tooltipLabel = isRatingSame
    ? "New rating must be different"
    : !rating
    ? "Please select a new rating before editing"
    : "Edit your rating";

  const handleSubmission = async (content: Content, user_rating: number) => {
    if (user) {
      setIsLoading(true);
      try {
        const res = await updateUserRating({
          user_id: user.id,
          content_id: content.id,
          rating: rating,
        });
        setIsLoading(false);
        toast({
          title: "Rating edited!",
          description: `${content.title}'s rating is now ${user_rating} / 10 🍿`,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        onRatingUpdated(rating); // Pass the new rating
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
        <ModalHeader>Edit {content.title}'s Rating</ModalHeader>
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
            <Text fontSize="xl" fontWeight="bold" textColor={"red"}>
              Old Rating {content.rating} / 10 🍿
            </Text>
          </Center>
          <Center>
            <Text fontSize="xl" fontWeight="bold">
              New Rating {rating} / 10 🍿
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
          <Tooltip label={tooltipLabel} placement="top">
            <Button
              colorScheme="yellow"
              isDisabled={!rating || isRatingSame}
              width={150}
              leftIcon={<EditIcon />}
              onClick={() => {
                handleSubmission(content, rating as number);
              }}
              style={{ marginRight: "10px" }}
            >
              {isLoading ? (
                <Spinner size="sm" color="white" mr={2} />
              ) : (
                "Edit Rating"
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

export default EditContentModal;
