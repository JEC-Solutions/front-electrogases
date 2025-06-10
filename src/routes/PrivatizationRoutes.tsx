import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface RoutesProps {
  children: React.ReactNode;
}

const cookies = new Cookies();

export const Private = ({ children }: RoutesProps) => {
  if (!cookies.get("token")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const Public = ({ children }: RoutesProps) => {
  if (cookies.get("token")) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};
