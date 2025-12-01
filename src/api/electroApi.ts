import axios from "axios";

const baseURL =
  import.meta.env.VITE_URL_API_PROD || import.meta.env.VITE_URL_API_DEV;

export const electroApi = axios.create({
  baseURL,
});
