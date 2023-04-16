import useAPI from "../useAPI";

interface Props {
  user_id: string;
  username: string;
}

const addUser = async (props: Props) => {
  const { data, error, isLoading } = useAPI({
    type: "post",
    route: "/addUser",
    config: {
      user_id: props.user_id,
      username: props.username,
    },
  });
  return { data, error, isLoading };
};

export default addUser;
