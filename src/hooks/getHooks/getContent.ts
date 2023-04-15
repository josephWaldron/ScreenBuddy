import { contentFilters } from "../../App";
import test_content from "../../data/GET/content";
import useAPI from "../useAPI";

export interface Content {
  id: number;
  name: string;
  rating: number;
  img_url: string;
}

export interface ContentArray {
  total: number;
  content: Content[];
}

const getContent = (props: contentFilters) => {
  const { data, error, isLoading } = useAPI({
    type: "get",
    route: "/content",
    config: {
      params: props,
    },
  });

  return { data, error, isLoading };
};

export default getContent;
