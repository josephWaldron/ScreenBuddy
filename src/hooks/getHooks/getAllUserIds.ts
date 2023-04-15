import allUsers from "../../data/GET/allUsers";
import useAPI from "../useAPI";

const getAllUserIds = () => {
  //returns an array of user ids for routes
  return allUsers;
};

export default getAllUserIds;
