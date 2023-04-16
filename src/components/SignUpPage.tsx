import { SignUp } from "@clerk/clerk-react";
import { Center } from "@chakra-ui/react";
const SignUpPage = () => {
  return (
    <Center>
      <SignUp
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom",
            logoPlacement: "inside",
          },
        }}
        afterSignInUrl={"/profile"}
        signInUrl="/sign-in"
      />
    </Center>
  );
};

export default SignUpPage;
