import useAPI from "../useAPI";

interface Props {
  user_id: string;
}

const getUser = ({ user_id }: Props) => {
  //returns an array of user ids for routes
  if (user_id === "") return { data: null, error: "", isLoading: false };
  const { data, error, isLoading } = useAPI({
    type: "post",
    route: "/getUser",
    config: {
      user_id: user_id,
    },
  });
  return { data, error, isLoading };
};

export default getUser;
