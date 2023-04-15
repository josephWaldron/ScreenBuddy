import React from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Center } from "@chakra-ui/react";
const SignInPage = () => {
  return (
    <Center>
      <SignIn
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom",
          },
        }}
        afterSignInUrl={"/profile"}
      />
    </Center>
  );
};

export default SignInPage;
