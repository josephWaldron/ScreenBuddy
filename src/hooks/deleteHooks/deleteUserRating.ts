import deleteUserRating from "../../data/DELETE/deleteUserRating";

interface Props {
  user_id: string;
  content_id: number;
}

const deleteUserRatingHook = (props: Props) => {
  //call backend to delete the rating based on props
  return deleteUserRating;
};

export default deleteUserRatingHook;
