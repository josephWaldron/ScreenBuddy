import { Button, HStack, Spacer, Tooltip, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { MdIosShare } from "react-icons/md";

interface Props {
  user_id?: string | undefined;
}

const Footer = ({ user_id }: Props) => {
  const toast = useToast();
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const [showButton, setShowButton] = useState(false);

  const handleShare = () => {
    if (!user_id) {
      const url = `${location.origin}/`;
      navigator.clipboard.writeText(url);
      setClicked(true); // update state when button is clicked
      toast({
        title: "HomePage copied!",
        description: "Share it with your friends!",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
    } else {
      const url = `${location.origin}/${user_id}`;
      navigator.clipboard.writeText(url);
      setClicked(true); // update state when button is clicked

      toast({
        title: "Profile copied!",
        description: "Share it with your friends!",
        status: "success",
        duration: 3000,
        isClosable: false,
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

      // Update the state to show/hide the button based on the scroll position
      setShowButton(scrollTop > 100);
    };

    // Add a scroll event listener to the window object
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HStack padding={2}>
      <Tooltip label="Copy link to clipboard">
        <Button
          leftIcon={<MdIosShare />}
          colorScheme={clicked ? "green" : "gray"} // change color scheme based on state
          onClick={handleShare}
        >
          Share
        </Button>
      </Tooltip>
      <Spacer />
      {user ? (
        <Button size={"lg"} colorScheme="green" onClick={handleAdd}>
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
      {showButton && (
        <Button onClick={handleScrollTop} colorScheme="blue">
          To the Top
        </Button>
      )}
    </HStack>
  );
};

export default Footer;
