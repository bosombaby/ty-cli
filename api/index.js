import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/repos/bosombaby/ty-cli-template",
  headers: {
    "Content-Type": "application/json",
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
