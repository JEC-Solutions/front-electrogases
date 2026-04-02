import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const nameMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Usuarios",
  devices: "Dispositivos",
  notifications: "Notificaciones",
};

export const Historial = () => {
  const location = useLocation();

  // Divide el path y filtra vacíos
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Mapea cada segmento a breadcrumb item
  const items = pathSnippets.map((_, index) => {
    const name = pathSnippets[index];
    return {
      title: nameMap[name] || name,
    };
  });

  return <Breadcrumb items={items} style={{ marginBottom: 16 }} />;
};
