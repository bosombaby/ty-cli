import axios from "axios";
import { BASE_REPOSITORY_URL, FINE_GRAINED_TOKEN } from "../config/api.js";

const api = axios.create({
  baseURL: BASE_REPOSITORY_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${FINE_GRAINED_TOKEN}`,
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 获取模板仓库的版本数据
export const getTemplateRepository = () => api.get("/branches");
