import backendClient from "../../services/backendClient";

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
}: Props) => {
  return new Promise((resolve, reject) => {
    backendClient
      .post("addUserRating", {
        user_id,
        content_id,
        title,
        image_url,
        content_type,
        rating,
        user_rating,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default addUserRating;
