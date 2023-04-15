import {
  SignIn,
  SignInButton,
  SignOutButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
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
        <Button colorScheme="green" onClick={handleProfile}>
          Profile
        </Button>
      )}
      {!user && (
        <Button colorScheme="blue" onClick={handleSignIn}>
          Sign In
        </Button>
      )}
    </HStack>
  );
};

export default NavBar;
