import backendClient from "../../services/backendClient";

interface Props {
  user_id: string;
  content_id: number;
  rating: number; //new rating
}

const updateUserRating = ({ user_id, content_id, rating }: Props) => {
  return new Promise((resolve, reject) => {
    backendClient
      .put("updateUserRating", {
        user_id,
        content_id,
        rating,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default updateUserRating;
