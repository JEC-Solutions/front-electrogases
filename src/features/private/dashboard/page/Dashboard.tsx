import { useEffect, useState } from "react";
import { Drawer, Layout } from "antd";
import {
  Sidebar,
  Navbar,
  Historial,
} from "@/features/private/dashboard/components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Roles } from "@/features/private/configuracion/roles/pages";
import { TipoDocumentos } from "@/features/private/configuracion/tipos_documentos/pages";
import { Departamentos } from "@/features/private/configuracion/departamentos/pages";
import { Ciudad } from "@/features/private/configuracion/ciudad/pages";
import { Menu } from "@/features/private/configuracion/menus/pages";
import { Opciones } from "@/features/private/configuracion/opciones/pages";
import { Clientes } from "@/features/private/inspeccion/clientes/pages";
import { Usuarios } from "@/features/private/configuracion/usuarios/pages";
import { Inicio } from "@/features/private/inicio/pages";
import { Rutas, CrearRuta } from "@/features/private/inspeccion/rutas/pages";
import { NotFound } from "@/features/public/404/page";
import {
  Inspecciones,
  Acta,
} from "@/features/private/inspeccion/inspecciones/pages";
import { CuadroMaestro } from "@/features/private/informes/cuadroMaestro/page";
import { InspectoresUsuarios } from "@/features/private/inspectores/usuarios/pages";
import { EquiposUtilizados } from "@/features/private/inspectores/equiposUtilizados/pages";
import { Siserco } from "../../informes/siserco/pages/Siserco";
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
          width={280}
          className="custom-sidebar shadow-2xl"
          theme="dark"
        >
          <Sidebar collapsed={collapsed} />
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
            placement="left"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ 
              body: { padding: 0 },
              header: { 
                background: "#001529", 
                borderBottom: "1px solid rgba(255,255,255,0.1)"
              }
            }}
            headerStyle={{ 
              background: "#001529" 
            }}
            className="sidebar-drawer"
            width={280}
          >
            <Sidebar collapsed={false} />
          </Drawer>
        )}

        <Content style={{ margin: "16px" }}>
          <Historial />
          <Routes>
            {/* Ruta por defecto cuando entras a /dashboard */}
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<Inicio />} />

            {/* Configuracion */}
            <Route
              path="/configuracion/departamentos"
              element={<Departamentos />}
            />
            <Route path="/configuracion/ciudad" element={<Ciudad />} />
            <Route
              path="/configuracion/tipo_documentos"
              element={<TipoDocumentos />}
            />
            <Route
              path="/configuracion/cambiar_contrasenia"
              element={<p>Cambiar contrasenia</p>}
            />
            <Route path="/configuracion/opciones" element={<Opciones />} />
            <Route path="/configuracion/menus" element={<Menu />} />
            <Route path="/configuracion/roles" element={<Roles />} />
            <Route path="/configuracion/usuarios" element={<Usuarios />} />

            {/* Inspecciones */}
            <Route path="/inspecciones/rutas" element={<Rutas />} />
            <Route path="/inspecciones/rutas/crear" element={<CrearRuta />} />
            <Route path="/inspecciones/clientes" element={<Clientes />} />
            <Route path="/inspecciones" element={<Inspecciones />} />
            <Route path="/inspecciones/:id" element={<Acta />} />

            {/* Informes */}
            <Route
              path="/informes/cuadro_maestro"
              element={<CuadroMaestro />}
            />

            <Route
              path="/informes/siserco"
              element={<Siserco />}
            />

            {/* Inspectores */}
            <Route
              path="/inspectores/usuarios"
              element={<InspectoresUsuarios />}
            />

            {/* Equipos Utilizados */}
            <Route
              path="/inspectores/equipos"
              element={<EquiposUtilizados />}
            />

            {/* Ruta catch-all dentro dashboard */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
