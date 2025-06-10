import Cookies from "universal-cookie";
import { electroApi } from "../api/electroApi";

const addAuthorizationHeader = (config: any) => {
  const cookies = new Cookies();
  const token = cookies.get("token") || cookies.get("token_password");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const handleUnauthorizedError = (error: any) => {
  if (error.response && error.response.status === 401) {
    clearAuthToken();

    if (error.response.data) {
      return Promise.reject(error);
    } else {
      redirectToLogin();
    }
  }
  return Promise.reject(error);
};

electroApi.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
electroApi.interceptors.response.use(
  (response) => response,
  handleUnauthorizedError
);

function redirectToLogin() {
  window.location.href = "/";
}

function clearAuthToken() {
  const cookies = new Cookies();
  cookies.remove("token");
}
