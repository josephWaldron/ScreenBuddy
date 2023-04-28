import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Card
      width={{ base: "200px", md: "220px" }}
      height={{ base: "400px", md: "450px" }}
    >
      <Skeleton height={"73%"} />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
