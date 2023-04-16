import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { MdIosShare, MdLogout } from "react-icons/md";
import RenderContent from "./renderContent/RenderContent";
import addUser from "../hooks/postHooks/addUser";

interface Props {
  users: string[] | undefined;
}

const Profile = (props: Props) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [clicked, setClicked] = useState(false);
  const toast = useToast();
  const handleSignOut = () => {
    signOut().then(() => {
      location.href = "/";
    });
  };
  if (!user)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>You are not logged in!</AlertTitle>
        <AlertDescription>
          Please sign in to view your profile.
        </AlertDescription>
      </Alert>
    );
  //check if the user is in the users array if it doesnt add user info to the database
  if (!props.users?.includes(user.id)) {
    console.log("user is in the database");
    if (user.username) {
      const username: string = user.username;
      addUser({
        user_id: user.id,
        username: username,
      });
    }
  }

  const handleShare = () => {
    const url = `${location.origin}/${user.id}`;
    navigator.clipboard.writeText(url);
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
      <RenderContent />
    </>
  );
};

export default Profile;
