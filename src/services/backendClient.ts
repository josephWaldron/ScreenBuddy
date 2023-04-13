import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:3000", //change this to the backend url
});

export default backendClient;
