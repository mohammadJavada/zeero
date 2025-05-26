import axios from "axios";
import toast from "react-hot-toast";

export const app = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
  },
});

let pendingRequests = {};

app.interceptors.request.use((config) => {
 
  return config;
}, (error) => {
  return Promise.reject(error);
});

app.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}:${response.config.url}`;
    delete pendingRequests[requestKey];
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.error('API Error:', error);

    if (error?.response?.status === 500 || error.message === "Network Error") {
      toast.error("اختلال در ارتباط با سرور");
    }

    const requestKey = `${originalRequest?.method}:${originalRequest?.url}`;
    delete pendingRequests[requestKey];

    return Promise.reject(error);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
