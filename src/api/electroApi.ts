import axios from "axios";

const baseURL = import.meta.env.VITE_PROD
  ? import.meta.env.VITE_URL_API_PROD || "/api"
  : import.meta.env.VITE_URL_API_DEV || "/api";

export const electroApi = axios.create({
  baseURL,
});
