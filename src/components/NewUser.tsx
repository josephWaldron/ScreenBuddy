import { useUser } from "@clerk/clerk-react";
import addUser from "../hooks/postHooks/addUser";

const NewUser = () => {
  const { user } = useUser();
  while (!user) {
    return <div>Loading</div>;
  }

  if (user.username) {
    const username: string = user.username;
    const { data, error, isLoading } = addUser({
      user_id: user.id,
      username: username,
    });
    if (!isLoading) {
      location.href = "/profile";
    }
  }

  return <div></div>;
};

export default NewUser;
