import axios from "axios";

const http = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = "Bearer " + token;
  }
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers,
  });
  return instance;
};

export default http;
