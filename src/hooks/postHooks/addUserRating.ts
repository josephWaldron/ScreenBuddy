import addUserRatingTemp from "../../data/POST/addUserRating";
import { res } from "../deleteHooks/deleteUserRating";

interface Props {
  user_id: string;
  content_id: number;
  title: string;
  image_url: string;
  content_type: string;
  rating: number;
  user_rating: number;
}

const addUserRating = ({
  user_id,
  content_id,
  title,
  image_url,
  content_type,
  rating,
  user_rating,
}: Props): res => {
  //call backend to add the rating based on props
  return addUserRatingTemp;
};

export default addUserRating;
