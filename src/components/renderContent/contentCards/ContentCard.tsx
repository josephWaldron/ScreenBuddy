import { Content } from "../ContentGrid";
import {
  Box,
  Card,
  Flex,
  Heading,
  Button,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Tooltip,
  PopoverArrow,
} from "@chakra-ui/react";
import Stars from "./Stars";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import AddContentModal from "./CRUD/AddContentModal";

interface Props {
  content: Content;
  user_id?: string;
}

const ContentCard = ({ content, user_id }: Props) => {
  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [canEditDelete, setCanEditDelete] = useState<boolean>(false);
  const { user } = useUser();
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);

  const openAddContentModal = () => {
    setIsAddContentModalOpen(true);
  };

  const closeAddContentModal = () => {
    setIsAddContentModalOpen(false);
  };
  useEffect(() => {
    if (user) {
      setCanAdd(true);
      setCanEditDelete(user.id === user_id);
    }
  }, [user, user_id]);

  return (
    <>
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={closeAddContentModal}
        content={content}
      />
      <Card position="relative">
        <Popover placement="right">
          <PopoverTrigger>
            <Button
              position="absolute"
              top={1}
              right={1}
              variant="ghost"
              size="sm"
            >
              <BsThreeDotsVertical />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent maxW="200px">
              <PopoverArrow />
              <PopoverBody>
                <Tooltip
                  label={
                    canAdd
                      ? `Add ${content.title} to your list`
                      : "Please login to add"
                  }
                  hasArrow
                  placement="right"
                >
                  <Button
                    colorScheme="green"
                    leftIcon={<GrAdd />}
                    mb={2}
                    width="100%"
                    size={"sm"}
                    isDisabled={!canAdd}
                    onClick={openAddContentModal} // Add this line
                  >
                    Add
                  </Button>
                </Tooltip>
                <Tooltip
                  label={
                    !user
                      ? "Please login to edit"
                      : canEditDelete
                      ? `Edit ${content.title}'s rating`
                      : "Go to your profile to edit your content"
                  }
                  hasArrow
                  placement="right"
                >
                  <Button
                    colorScheme="yellow"
                    leftIcon={<MdEdit />}
                    mb={2}
                    width="100%"
                    size={"sm"}
                    isDisabled={!canEditDelete}
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip
                  label={
                    !user
                      ? "Please login to delete"
                      : canEditDelete
                      ? `Delete ${content.title}'s rating from your list`
                      : "Go to your profile to delete content"
                  }
                  hasArrow
                  placement="right"
                >
                  <Button
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    width="100%"
                    size={"sm"}
                    isDisabled={!canEditDelete}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

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
            <Stars rating={content.rating} />
          </Box>
        </Flex>
      </Card>
    </>
  );
};

export default ContentCard;
