interface Props {
  user_id: string;
  content_id: number;
}

export interface res {
  success: boolean;
  message: string;
}

const deleteUserRatingHook = (props: Props) => {
  //call backend to delete the rating based on props
  return "success";
};

export default deleteUserRatingHook;
