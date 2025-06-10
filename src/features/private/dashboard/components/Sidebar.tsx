import { Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/")[2] || "users";

  return (
    <>
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.3)",
          color: "white",
          textAlign: "center",
          lineHeight: "32px",
          fontWeight: "bold",
        }}
      >
        Logo
      </div>
      <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/dashboard/users">Usuarios</Link>
        </Menu.Item>
        <Menu.Item key="devices" icon={<LaptopOutlined />}>
          <Link to="/dashboard/devices">Dispositivos</Link>
        </Menu.Item>
        <Menu.Item key="notifications" icon={<NotificationOutlined />}>
          <Link to="/dashboard/notifications">Notificaciones</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
