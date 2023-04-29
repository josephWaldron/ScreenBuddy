import { useUser } from "@clerk/clerk-react";
import lightModeLogo from "../assets/ScreenBuddy-logos_black.png";
import darkModeLogo from "../assets/ScreenBuddy-logos_white.png";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdPerson, MdLogin, MdMenu } from "react-icons/md";

const NavBar = () => {
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const { user, isLoaded } = useUser();
  const isSmallerThanMd = useBreakpointValue({ base: true, sm: false });

  const handleProfile = () => {
    location.href = `/profile`;
  };
  const handleSignIn = () => {
    location.href = "/sign-up";
  };

  if (!isLoaded)
    return (
      <Flex padding={2} height={75} alignItems="center">
        <Box width={50}> </Box>
        <Spacer />
        <a href="/">
          <Text fontSize={"3xl"}>ScreenBuddy BETA</Text>
        </a>
        <Spacer />
        <Box width={100}></Box>
      </Flex>
    );

  return (
    <Flex padding={2} height={75} alignItems="center">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<MdMenu />}
          size="md"
          variant="outline"
        />
        <MenuList>
          <MenuItem as="a" href="/">
            About
          </MenuItem>
          <MenuItem as="a" href="/">
            Report Issue
          </MenuItem>
        </MenuList>
      </Menu>

      <a href="/">
        <Image src={logo} width={50} marginLeft={10} />
      </a>
      <Spacer />
      {!isSmallerThanMd && (
        <>
          <a href="/">
            <Text fontSize={"3xl"}>ScreenBuddy BETA</Text>
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
        </>
      )}
    </Flex>
  );
};

export default NavBar;
