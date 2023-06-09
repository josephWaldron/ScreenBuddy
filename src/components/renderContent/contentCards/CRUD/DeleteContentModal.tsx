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
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Content } from "../../ContentGrid";
import { useUser } from "@clerk/clerk-react";
import deleteUserRating from "../../../../hooks/deleteHooks/deleteUserRating";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: Content;
  onRatingDeleted: () => void;
}

const DeleteContentModal = ({
  isOpen,
  onClose,
  content,
  onRatingDeleted,
}: Props) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmission = async (content: Content) => {
    if (user) {
      setIsLoading(true);
      try {
        await deleteUserRating({
          user_id: user.id,
          content_id: content.id,
        });
        setIsLoading(false);
        onRatingDeleted();
        onClose();
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {content.title}'s Rating</ModalHeader>
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
              Your Rating {content.rating} / 10 🍿
            </Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            width={150}
            leftIcon={<DeleteIcon />}
            onClick={() => {
              handleSubmission(content);
            }}
            style={{ marginRight: "10px" }}
          >
            {isLoading ? (
              <Spinner size="sm" color="white" mr={2} />
            ) : (
              "Delete Rating"
            )}
          </Button>

          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteContentModal;
