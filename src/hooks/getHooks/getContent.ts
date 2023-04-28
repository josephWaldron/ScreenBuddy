import { contentFilters } from "../../components/renderContent/RenderContent";
import useAPI from "../useAPI";

const getContent = (filters: contentFilters) => {
  return useAPI({
    type: "post",
    route: "/getContent",
    config: {
      user_id: filters.user_id,
      content_type: filters.content_type,
      title: filters.title,
      filter: filters.filter,
    },
  });
};

export default getContent;
