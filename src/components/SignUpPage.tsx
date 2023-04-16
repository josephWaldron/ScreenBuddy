import { Center } from "@chakra-ui/react";
import { SignUp } from "@clerk/clerk-react";
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
        afterSignUpUrl={"/newUser"}
        signInUrl={"/sign-in"}
      />
    </Center>
  );
};
export default SignUpPage;
