import { AddIcon, ChevronUpIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, HStack, Spacer, Tooltip, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { MdIosShare, MdKeyboardArrowUp } from "react-icons/md";

interface Props {
  user_id?: string | undefined;
}

const Footer = ({ user_id }: Props) => {
  const toast = useToast();
  const { user } = useUser();
  const handleShare = () => {
    if (!user_id) {
      const url = `${location.origin}/`;
      navigator.clipboard.writeText(url);
      toast({
        title: "Home Page Link Copied!",
        description: "Share it with your friends!",
        duration: 3000,
        isClosable: false,
        position: "top",
      });
    } else {
      const url = `${location.origin}/${user_id}`;
      navigator.clipboard.writeText(url);

      toast({
        title: "Profile Link Copied!",
        description: "Share it with your friends!",
        duration: 3000,
        isClosable: false,
        position: "top",
      });
    }
  };

  const handleAdd = () => {
    location.href = "/add";
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check the current scroll position
      const scrollTop = window.pageYOffset;
    };
    // Add a scroll event listener to the window object
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#171923",
      }}
    >
      <HStack padding={2}>
        <Tooltip label="Copy link to clipboard">
          <Button
            leftIcon={<CopyIcon />}
            colorScheme={"blue"} // change color scheme based on state
            onClick={handleShare}
          >
            Share
          </Button>
        </Tooltip>
        <Spacer />
        {user ? (
          <Button
            rightIcon={<AddIcon />}
            size={"lg"}
            colorScheme="green"
            onClick={handleAdd}
          >
            Add Content
          </Button>
        ) : (
          <Tooltip label="Please log in to add content">
            <span>
              <Button colorScheme="red" size={"lg"} isDisabled>
                Add Content
              </Button>
            </span>
          </Tooltip>
        )}
        <Spacer />

        <Button
          rightIcon={<ChevronUpIcon />}
          onClick={handleScrollTop}
          colorScheme="blue"
        >
          Top
        </Button>
      </HStack>
    </footer>
  );
};

export default Footer;
