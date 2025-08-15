import Cookies from "universal-cookie";

const cookies = new Cookies();

export const handleLogout = () => {
  const allCookies = cookies.getAll();
  Object.keys(allCookies).forEach((cookieName) => {
    cookies.remove(cookieName, { path: "/" });
  });

  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "/";
};

