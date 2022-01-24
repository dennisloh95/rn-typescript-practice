import axios from "axios";
import { API_URL } from "react-native-dotenv";

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(
  (config) => {
    console.log("请求 config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("资料 ", response.data);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
