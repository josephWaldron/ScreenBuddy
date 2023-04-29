import backendClient from "../../services/backendClient";

interface Props {
  user_id: string;
  content_id: number;
}

const deleteUserRating = ({ user_id, content_id }: Props) => {
  return new Promise((resolve, reject) => {
    backendClient
      .delete("deleteUserRating", {
        params: {
          user_id,
          content_id,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default deleteUserRating;
