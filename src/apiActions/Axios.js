import axios from "axios";
import { ACCESS_TOKEN } from "../utils/Constants";

const Axios = axios.create({
  baseURL: `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + ACCESS_TOKEN,
  },
  validateStatus: (status) => status <= 304,
});
export default Axios;

// Axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = "Bearer " + ACCESS_TOKEN;

//   return config;
// });
