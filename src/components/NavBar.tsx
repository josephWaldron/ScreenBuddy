import { useUser } from "@clerk/clerk-react";
import lightModeLogo from "../assets/ScreenBuddy-logos_black.png";
import darkModeLogo from "../assets/ScreenBuddy-logos_white.png";
import {
  Button,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdPerson, MdLogin } from "react-icons/md";

const NavBar = () => {
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const { user } = useUser();

  const handleProfile = () => {
    location.href = `/profile`;
  };
  const handleSignIn = () => {
    location.href = "/sign-in";
  };
  //console.log(user);
  return (
    <HStack padding="10px">
      <a href="/">
        <Image src={logo} boxSize="100px" />
      </a>
      <Spacer />
      <Text>ScreenBuddy</Text>
      <Spacer />
      {user && (
        <Button
          rightIcon={<MdPerson />}
          colorScheme="green"
          onClick={handleProfile}
        >
          Profile
        </Button>
      )}
      {!user && (
        <Button
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