import test_content from "../data/GET/content";

export interface Content {
  id: number;
  name: string;
  rating: number;
  img_url: string;
}

interface ContentResponse {
  total: number;
  content: Content[];
}

interface Props {
  user_id?: string;
  category?: string;
  filter?: string;
  search?: string;
  page?: number;
}

const getContent = (props: Props) => {
  return test_content;
};

export default getContent;
