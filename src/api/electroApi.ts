import axios from "axios";

const baseURL = import.meta.env.VITE_PROD === true
  ? import.meta.env.VITE_URL_API_PROD || "/api"
  : import.meta.env.VITE_URL_API_DEV || "/api";

console.log("🚀 ~ electroApi.ts:7 ~ baseURL:", baseURL);

export const electroApi = axios.create({
  baseURL,
});
