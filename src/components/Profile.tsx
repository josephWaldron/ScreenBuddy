import { Alert, Button } from "@chakra-ui/react";
import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const handleSignOut = () => {
    signOut().then(() => {
      location.href = "/";
    });
  };

  if (!user) return <Alert status="error">You are not signed in</Alert>;
  return (
    <>
      <div>your profile {user?.username}</div>
      <Button colorScheme="red" onClick={handleSignOut}>
        Sign Out
      </Button>
    </>
  );
};

export default Profile;
