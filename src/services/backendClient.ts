import axios from "axios";

const backendClient = axios.create({
  baseURL: "https://screen-buddy-api.vercel.app/", //change this to the backend url
});

export default backendClient;
