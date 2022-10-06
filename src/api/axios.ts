import axios from "axios";

const BASE_URL = "http://192.168.3.21:8888/chat-app/v1/";
export const IMAGE_ROOT_SOURCE = "http://192.168.3.21:8888/img";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
