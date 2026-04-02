import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Empty,
  Layout,
  Popover,
  Space,
  Typography,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { handleLogout } from "@/utils";
import { useNotificaciones } from "../hooks/useNotificaciones";

const { Header } = Layout;
const { Text } = Typography;

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
  const { notificaciones, noLeidasCount, marcarLeida, marcarTodasLeidas } =
    useNotificaciones();

  const icon = isMobile
    ? MenuOutlined
    : collapsed
      ? MenuUnfoldOutlined
      : MenuFoldOutlined;

  const onClick = isMobile ? toggleDrawer : toggleCollapsed;

  const menuProps = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Cerrar sesión",
        onClick: handleLogout,
      },
    ],
  };

  const notificationsContent = (
    <div style={{ width: 300 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Text strong>Notificaciones</Text>
        {noLeidasCount > 0 && (
          <Button type="link" size="small" onClick={marcarTodasLeidas}>
            Marcar todas como leídas
          </Button>
        )}
      </div>
      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        {notificaciones.length > 0 ? (
          notificaciones.map((item) => (
            <div
              key={item.id_notificacion_evento}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1, paddingRight: 8 }}>
                <Text strong style={{ fontSize: 13, display: "block" }}>
                  {item.titulo}
                </Text>
                <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                  {item.mensaje}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.45)",
                    display: "block",
                    marginTop: 4,
                  }}
                >
                  {new Date(item.created_at).toLocaleString()}
                </Text>
              </div>
              <Button
                type="text"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => marcarLeida(item.id_notificacion_evento)}
                title="Marcar como leída"
                style={{ color: "#1890ff" }}
              />
            </div>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sin notificaciones pendientes"
            style={{ margin: "32px 0" }}
          />
        )}
      </div>
    </div>
  );

  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        zIndex: 10,
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

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Popover
          content={notificationsContent}
          trigger="click"
          placement="bottomRight"
          classNames={{ root: "notifications-popover" }}
        >
          <Badge count={noLeidasCount} size="small" offset={[-2, 6]}>
            <BellOutlined
              style={{
                fontSize: 20,
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.45)",
              }}
            />
          </Badge>
        </Popover>

        <Dropdown menu={menuProps} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
            <span>Usuario</span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};
