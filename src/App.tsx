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
import AddContent from "./components/renderContent/contentCards/AddContent";
import ReportIssue from "./components/ReportIssue";
import About from "./components/About";

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
          <Routes>
            <Route path="/" element={<RenderContent user_id="" />} />
            <Route path="/reportIssue" element={<ReportIssue />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddContent />} />
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
        </ClerkProvider>
      </Flex>
    </>
  );
}

export default App;
