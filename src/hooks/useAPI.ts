import backendClient from "../services/backendClient";
import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

interface Props {
  type: "get" | "post" | "put" | "delete";
  route: string;
  config: AxiosRequestConfig; //object of data to send to backend
}

const useAPI = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
  }, []);

  return { data, error, isLoading };
};

export default useAPI;
