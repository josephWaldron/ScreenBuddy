import { ClerkProvider } from "@clerk/clerk-react";
import NavBar from "./components/NavBar";
import getAllUserIds from "./hooks/getHooks/getAllUserIds";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import { dark } from "@clerk/themes";

import Profile from "./components/Profile";
import RenderContent from "./components/renderContent/RenderContent";
import SignUpPage from "./components/SignUpPage";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "./components/renderContent/Footer";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  const users = getAllUserIds();
  return (
    <>
      <Flex minHeight="100vh" flexDirection="column">
        <ClerkProvider
          publishableKey={clerkPubKey}
          appearance={{
            baseTheme: dark,
          }}
        >
          <Box bgColor={"gray.900"}>
            <NavBar />
          </Box>
          <Box flex="1">
            <Routes>
              <Route path="/" element={<RenderContent home={true} />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/profile" element={<Profile users={users.data} />} />

              {!users.isLoading &&
                users.data.map((userIdMap: string) => (
                  <Route
                    key={userIdMap}
                    path={`/${userIdMap}`}
                    element={<RenderContent user_id={userIdMap} />}
                  ></Route>
                ))}
            </Routes>
          </Box>
          <Box as="footer" mt="auto" bgColor={"gray.900"}>
            <Footer />
          </Box>
        </ClerkProvider>
      </Flex>
    </>
  );
}

export default App;
