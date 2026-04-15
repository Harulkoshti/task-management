import axios from "axios";
import type { RootState } from "../redux/store";

const api = axios.create({
  baseURL: "http://localhost:4000"
});

export const attachAuthInterceptor = (getState: () => RootState): void => {
  api.interceptors.request.use((config) => {
    const token = getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export default api;
