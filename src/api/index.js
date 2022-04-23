import axios from "axios";

const baseURL = "http://localhost:4000/api/";
const http = axios.create({
  baseURL,
});
// const token = localStorage.getItem("token");
// http.defaults.headers.common["Authorization"] = token;

export default http;
