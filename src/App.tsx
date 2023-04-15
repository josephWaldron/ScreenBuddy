import { ClerkProvider, SignIn, useUser } from "@clerk/clerk-react";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import getContent from "./hooks/getHooks/getContent";
import getAllUserIds from "./hooks/getHooks/getAllUserIds";
import { Route, Routes, useParams } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import { dark } from "@clerk/themes";
import { useColorModeValue } from "@chakra-ui/react";
import Profile from "./components/Profile";
import RenderContent from "./components/renderContent/RenderContent";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {

  const users = getAllUserIds();

  return (
    <>
      <ClerkProvider
        publishableKey={clerkPubKey}
        appearance={{
          baseTheme: dark,
        }}
      >
        <NavBar />
        <Routes>
          {/* Create a route for each user ID */}
          <Route path="/" element={<RenderContent />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile" element={<Profile />} />
          {users.map((userIdMap) => (
            <Route
              key={userIdMap}
              path={`/${userIdMap}`}
              element={<RenderContent user_id={userIdMap} />}
            ></Route>
          ))}
        </Routes>
      </ClerkProvider>
    </>
  );
}

export default App;
