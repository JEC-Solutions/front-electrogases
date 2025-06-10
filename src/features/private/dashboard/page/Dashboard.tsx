import { useEffect, useState } from "react";
import { Drawer, Layout } from "antd";
import {
  Sidebar,
  Navbar,
  Historial,
} from "@/features/private/dashboard/components";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "@/features/public/404/page";

const { Sider, Content } = Layout;

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerVisible(false); // Cierra drawer en desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Sidebar />
        </Sider>
      )}

      <Layout>
        <Navbar
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed(!collapsed)}
          isMobile={isMobile}
          drawerVisible={drawerVisible}
          toggleDrawer={() => setDrawerVisible(!drawerVisible)}
        />

        {/* Drawer para móvil */}
        {isMobile && (
          <Drawer
            title="Menu"
            placement="left"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ body: { padding: 0 } }}
          >
            <Sidebar />
          </Drawer>
        )}

        <Content style={{ margin: "16px" }}>
          <Historial />
          <Routes>
            {/* Ruta por defecto cuando entras a /dashboard */}
            <Route index element={<Navigate to="users" replace />} />

            {/* Rutas hijas */}
            <Route path="/users" element={<h1>usuarios</h1>} />
            <Route path="/devices" element={<h1>devices</h1>} />
            <Route path="/notifications" element={<h1>notificaciones</h1>} />

            {/* Ruta catch-all dentro dashboard */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
