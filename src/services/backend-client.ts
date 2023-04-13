import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default backendClient;
