import { Alert, Button, Tooltip } from "@chakra-ui/react";
import { useClerk, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { MdIosShare, MdLogout } from "react-icons/md";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [clicked, setClicked] = useState(false); // add state variable
  const handleSignOut = () => {
    signOut().then(() => {
      location.href = "/";
    });
  };

  if (!user) return <Alert status="error">You are not signed in</Alert>;

  const handleShare = () => {
    const url = `${location.origin}/${user.id}`;
    navigator.clipboard.writeText(url);
    setClicked(true); // update state when button is clicked
  };
  return (
    <>
      <div>your profile {user?.username}</div>
      <Button
        colorScheme="red"
        onClick={handleSignOut}
        rightIcon={<MdLogout />}
      >
        Sign Out
      </Button>
      <Tooltip label="Copy profile link to clipboard">
        <Button
          leftIcon={<MdIosShare />}
          colorScheme={clicked ? "green" : "gray"} // change color scheme based on state
          onClick={handleShare}
        >
          Share
        </Button>
      </Tooltip>
    </>
  );
};

export default Profile;
