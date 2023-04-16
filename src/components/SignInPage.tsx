import { SignIn } from "@clerk/clerk-react";
import { Center } from "@chakra-ui/react";
const SignInPage = () => {
  return (
    <Center>
      <SignIn
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom",
            logoPlacement: "inside",
          },
        }}
        afterSignInUrl={"/profile"}
      />
    </Center>
  );
};

export default SignInPage;
