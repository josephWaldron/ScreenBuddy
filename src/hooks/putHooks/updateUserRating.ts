import updateUserRatingTEMP from "../../data/PUT/updateUserRating";
import { res } from "../deleteHooks/deleteUserRating";

interface Props {
  user_id: string;
  content_id: number;
  rating: number; //new rating
}

const updateUserRating = (props: Props): res => {
  //call backend to update the rating based on props
  return updateUserRatingTEMP;
};

export default updateUserRating;
