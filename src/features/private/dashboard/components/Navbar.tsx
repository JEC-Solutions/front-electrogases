import React from "react";
import { Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

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

  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
      }}
    >
      {React.createElement(icon, {
        className: "trigger",
        onClick,
        style: { fontSize: 18, cursor: "pointer" },
      })}
      <h2 style={{ marginLeft: 16 }}>Dashboard</h2>
    </Header>
  );
};
