import React from "react";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";

const { Header } = Layout;

const cookies = new Cookies();

interface NavbarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  isMobile: boolean;
  drawerVisible: boolean;
  toggleDrawer: () => void;
}

export const Navbar = ({
  collapsed,
  toggleCollapsed,
  isMobile,
  toggleDrawer,
}: NavbarProps) => {
  // Decide el ícono y la acción del botón
  const icon = isMobile
    ? MenuOutlined
    : collapsed
    ? MenuUnfoldOutlined
    : MenuFoldOutlined;

  const onClick = isMobile ? toggleDrawer : toggleCollapsed;

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Esto separa íconos y perfil
        paddingLeft: 16,
        paddingRight: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {React.createElement(icon, {
          className: "trigger",
          onClick,
          style: { fontSize: 18, cursor: "pointer" },
        })}
        <h2 style={{ marginLeft: 16, marginBottom: 0 }}>Dashboard</h2>
      </div>

      <Dropdown overlay={menu} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
          <span>Usuario</span>
        </Space>
      </Dropdown>
    </Header>
  );
};
