import axios from "axios";

const isProd = import.meta.env.VITE_PROD === "true";

const baseURL = isProd
  ? import.meta.env.VITE_URL_API_PROD ?? "/api"
  : import.meta.env.VITE_URL_API_DEV ?? "/api";

export const electroApi = axios.create({
  baseURL,
});
