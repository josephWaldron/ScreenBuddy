import addUserRatingTemp from "../../data/POST/addUserRating";
import { res } from "../deleteHooks/deleteUserRating";

interface Props {
  user_id: string;
  content_id: number;
  rating: number;
}

const addUserRating = (props: Props): res => {
  //call backend to add the rating based on props
  return addUserRatingTemp;
};

export default addUserRating;

//create a post hook that will handle all post requests and return the success boolean, error, and isLoading boolean