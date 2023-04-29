import Icon from "@chakra-ui/icon";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface Props {
  rating: number;
}

const Stars = ({ rating }: Props) => {
  //take the target rating and round it to the nearest half
  const newRating = rating / 2; //might be out of 5
  const roundedRating = Math.round(newRating * 2) / 2;
  //based on the rounded rating, render the correct amount of stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<Icon key={i} as={BsStarFill} color="yellow.500" />);
    } else if (i === Math.ceil(roundedRating)) {
      stars.push(<Icon key={i} as={BsStarHalf} color="yellow.500" />);
    } else {
      stars.push(<Icon key={i} as={BsStar} color="yellow.500" />);
    }
  }
  return <>{stars}</>;
};

export default Stars;
