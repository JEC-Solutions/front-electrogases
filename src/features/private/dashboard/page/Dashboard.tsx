import { useEffect, useState } from "react";
import { Drawer, Layout } from "antd";
import {
  Sidebar,
  Navbar,
  Historial,
} from "@/features/private/dashboard/components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Roles } from "@/features/private/configuracion/roles/pages";
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
      if (!mobile) setDrawerVisible(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={250}
        >
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
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<h1>Inicio</h1>} />

            {/* Configuracion */}
            <Route
              path="/configuracion/departamentos"
              element={<h1>Departamentos</h1>}
            />
            <Route path="/configuracion/ciudad" element={<h1>Ciudad</h1>} />
            <Route
              path="/configuracion/tipo_documentos"
              element={<h1>tipo de documentos</h1>}
            />
            <Route
              path="/configuracion/cambiar_contrasenia"
              element={<h1>Cambiar contrasenia</h1>}
            />
            <Route path="/configuracion/opciones" element={<h1>opciones</h1>} />
            <Route path="/configuracion/menus" element={<h1>menus</h1>} />
            <Route path="/configuracion/roles" element={<Roles />} />
            <Route path="/configuracion/usuarios" element={<h1>menus</h1>} />

            {/* Inspecciones */}
            <Route path="/inspecciones/rutas" element={<h1>rutas</h1>} />
            <Route path="/inspecciones/clientes" element={<h1>clientes</h1>} />
            <Route path="/inspecciones/casas" element={<h1>casas</h1>} />
            <Route path="/inspecciones" element={<h1>inspecciones</h1>} />

            {/* Informes */}
            <Route
              path="/informes/cuadro_maestro"
              element={<h1>cuadro maestro</h1>}
            />

            {/* Ruta catch-all dentro dashboard */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
