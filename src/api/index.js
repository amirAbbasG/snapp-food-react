import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/";

const http = axios.create();

export default http;
