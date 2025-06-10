import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

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
    const url = "/" + pathSnippets.slice(0, index + 1).join("/");
    const name = pathSnippets[index];

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{nameMap[name] || name}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>{breadcrumbItems}</Breadcrumb>
  );
};
