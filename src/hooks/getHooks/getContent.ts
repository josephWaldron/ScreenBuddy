import test_content from "../../data/GET/content";

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

interface Props {
  user_id?: string;
  category?: string;
  filter?: string;
  search?: string;
  page?: number;
}

const getContent = (props: Props): ContentArray => {
  //call backend to get content that matches the prop filters
  return test_content;
};

export default getContent;
