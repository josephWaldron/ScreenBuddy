import { useUser } from "@clerk/clerk-react";
import lightModeLogo from "../assets/ScreenBuddy-logos_black.png";
import darkModeLogo from "../assets/ScreenBuddy-logos_white.png";
import {
  Box,
  Button,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdPerson, MdLogin, MdPersonAddAlt1 } from "react-icons/md";

const NavBar = () => {
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const { user, isLoaded } = useUser();

  const handleProfile = () => {
    location.href = `/profile`;
  };
  const handleSignIn = () => {
    location.href = "/sign-up";
  };
  if (!isLoaded)
    return (
      <HStack padding={2} height={75}>
        <Box width={50}> </Box>
        <Spacer />
        <a href="/">
          <Text fontSize={"3xl"}>ScreenBuddy</Text>
        </a>
        <Spacer />
        <Box width={100}></Box>
      </HStack>
    );

  return (
    <HStack padding={2} height={75}>
      <a href="/">
        <Image src={logo} width={50} />
      </a>
      <Spacer />
      <a href="/">
        <Text fontSize={"3xl"}>ScreenBuddy</Text>
      </a>
      <Spacer />
      {user && (
        <Button
          width={100}
          rightIcon={<MdPerson />}
          colorScheme="green"
          onClick={handleProfile}
        >
          Profile
        </Button>
      )}
      {!user && (
        <Button
          width={100}
          rightIcon={<MdLogin />}
          colorScheme="blue"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}
    </HStack>
  );
};

export default NavBar;
