import axios from "axios";

const backendClient = axios.create({
  baseURL: "https://screen-buddy-9oga43jf6-zachgordon25.vercel.app/", //change this to the backend url
});

export default backendClient;
