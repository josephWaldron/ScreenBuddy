import backendClient from "../services/backendClient";
import { useState } from "react";
import useDeepCompareEffect from "./useDeepCompareEffect"; // Import the custom hook

interface Props {
  type: "get" | "post" | "put" | "delete";
  route: string;
  config?: {}; //object of data to send to backend
}

const useAPI = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  useDeepCompareEffect(() => {
    // Replace useEffect with useDeepCompareEffect
    const controller = new AbortController();
    setLoading(true);
    const { type, route, config } = props;
    let request;
    switch (type) {
      case "get":
        request = backendClient.get(route, config);
        break;
      case "post":
        request = backendClient.post(route, config);
        break;
      case "put":
        request = backendClient.put(route, config);
        break;
      case "delete":
        request = backendClient.delete(route, config);
        break;
      default:
        setError(`Invalid request type: ${type}`);
        setLoading(false);
        return;
    }
    request
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [props.type, props.route, props.config]); // Remove JSON.stringify

  return { data, error, isLoading };
};

export default useAPI;
