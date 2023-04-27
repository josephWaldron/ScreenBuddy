import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { MdLogout } from "react-icons/md";
import RenderContent from "./renderContent/RenderContent";

interface Props {
  users: string[] | undefined;
}

const Profile = (props: Props) => {
  const { user } = useUser();
  const { signOut } = useClerk();
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

  return (
    <>
      <div>your profile {user?.username}</div>
      <HStack>
        <Button
          colorScheme="red"
          onClick={handleSignOut}
          rightIcon={<MdLogout />}
        >
          Sign Out
        </Button>
      </HStack>
      <RenderContent user_id={user.id} />
    </>
  );
};

export default Profile;
