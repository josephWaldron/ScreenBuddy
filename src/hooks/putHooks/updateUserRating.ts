interface Props {
  user_id: string;
  content_id: number;
  rating: number; //new rating
}

const updateUserRating = (props: Props) => {
  //call backend to update the rating based on props
  return "success";
};

export default updateUserRating;
