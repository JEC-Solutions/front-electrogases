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
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const name = pathSnippets[index];
    return (
      <Breadcrumb.Item key={index}>{nameMap[name] || name}</Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>{breadcrumbItems}</Breadcrumb>
  );
};
