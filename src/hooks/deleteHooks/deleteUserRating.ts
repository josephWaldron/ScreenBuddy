import deleteUserRating from "../../data/DELETE/deleteUserRating";

interface Props {
  user_id: string;
  content_id: number;
}

export interface res {
  success: boolean;
  message: string;
}

const deleteUserRatingHook = (props: Props): res => {
  //call backend to delete the rating based on props
  return deleteUserRating;
};

export default deleteUserRatingHook;
