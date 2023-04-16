import { ClerkProvider } from "@clerk/clerk-react";
import NavBar from "./components/NavBar";
import getAllUserIds from "./hooks/getHooks/getAllUserIds";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import { dark } from "@clerk/themes";

import Profile from "./components/Profile";
import RenderContent from "./components/renderContent/RenderContent";
import SignUpPage from "./components/SignUpPage";
import NewUser from "./components/NewUser";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  const users = getAllUserIds();
  console.log(users);
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
          <Route path="/" element={<RenderContent />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newUser" element={<NewUser />} />
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
    </>
  );
}

export default App;
