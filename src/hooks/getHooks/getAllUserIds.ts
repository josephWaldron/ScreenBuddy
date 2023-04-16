import useAPI from "../useAPI";

const getAllUserIds = () => {
  //returns an array of user ids for routes
  const { data, error, isLoading } = useAPI({
    type: "get",
    route: "/getAllUserIds",
  });
  return { data, error, isLoading };
};

export default getAllUserIds;
