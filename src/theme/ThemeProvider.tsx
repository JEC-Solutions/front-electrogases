import { ConfigProvider } from "antd";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#529ecc",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
