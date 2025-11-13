import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queyClient.ts";

// Ant Design en español
import { ConfigProvider, App as AntApp } from "antd";
import esES from "antd/locale/es_ES";


import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={esES}>
    <AntApp>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AntApp>
  </ConfigProvider>
);
