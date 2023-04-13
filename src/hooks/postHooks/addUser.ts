import addUserRes from "../../data/POST/addUser";
import { res } from "../deleteHooks/deleteUserRating";

interface Props {
  user_id: string;
  user_name: string;
}

const addUser = (props: Props): res => {
  //call backend to add user based on props
  return addUserRes;
};

export default addUser;
