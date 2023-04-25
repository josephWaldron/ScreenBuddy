import { Button, HStack, Spacer, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  user_id?: string;
}

const Footer = ({ user_id }: Props) => {
  const toast = useToast();
  const [clicked, setClicked] = useState(false);

  const handleShare = () => {
    //if userid is not provided

    // const url = `${location.origin}/${user.id}`;
    // navigator.clipboard.writeText(url);
    setClicked(true); // update state when button is clicked

    toast({
      title: "Profile copied!",
      description: "Share it with your friends!",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };
  return (
    <HStack padding={2}>
      <Button>Share</Button>
      <Spacer />
      <Button size={"lg"}>Add Content</Button>
      <Spacer />
      <Button>To the Top</Button>
    </HStack>
  );
};

export default Footer;
