import externalContent from "../../data/GET/externalContent";

interface Props {
  search: string;
}

export interface ExternalContent {
  id: number;
  name: string;
  img_url: string;
}

const getExternalContent = (props: Props): ExternalContent[] => {
  //call backend to get 3rd party api content
  return externalContent;
};

export default getExternalContent;
