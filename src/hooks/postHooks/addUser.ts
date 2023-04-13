import addUserRes from "../../data/POST/addUser";

interface Props {
  user_id: string;
  user_name: string;
}

const addUser = (props: Props) => {
  //call backend to add user based on props
  return addUserRes;
};

export default addUser;
