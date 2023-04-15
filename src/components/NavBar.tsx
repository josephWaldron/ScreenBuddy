import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
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
    if (!user) {
      return;
    }
    location.href = `/${user.id}`;
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
      {!user && <SignInButton />}
      {user && <Button onClick={handleProfile}>Profile</Button>}
      {user && <SignOutButton />}
    </HStack>
  );
};

export default NavBar;
