import { Menu, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "@/features/private/dashboard/hooks";
import { IoIosSettings } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";
import { JSX } from "react";
import { AiFillHome } from "react-icons/ai";

const iconMap: Record<string, JSX.Element> = {
  IoIosSettings: <IoIosSettings />,
  SiGoogleforms: <SiGoogleforms />,
};

export const Sidebar = () => {
  const { permisos, isLoading } = useSidebar();
  const location = useLocation();

  const currentPath = location.pathname.replace("/dashboard/", "");

  const groupedMenus: Record<
    number,
    { nombre: string; icono: string; opciones: any[] }
  > = {};

  permisos.forEach((permiso: any) => {
    const { menu } = permiso.opcion;
    if (!groupedMenus[menu.id_menu]) {
      groupedMenus[menu.id_menu] = {
        nombre: menu.nombre,
        icono: menu.icono,
        opciones: [],
      };
    }
    groupedMenus[menu.id_menu].opciones.push(permiso.opcion);
  });

  if (isLoading) return <Spin />;

  const openSubmenuKeys = Object.entries(groupedMenus)
    .filter(([_, menu]) =>
      menu.opciones.some((op) => `/dashboard/${op.link}` === location.pathname)
    )
    .map(([id]) => id);

  return (
    <>
      <div
        style={{
          height: 64,
          margin: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/dashboard/inicio">
          <img
            src="/imagenes/logo.png"
            alt="Logo"
            style={{ width: 40, height: 40, cursor: "pointer" }}
          />
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath || "inicio"]}
        defaultOpenKeys={openSubmenuKeys}
      >
        <Menu.Item key="inicio" icon={<AiFillHome />}>
          <Link to="/dashboard/inicio">Inicio</Link>
        </Menu.Item>

        {Object.entries(groupedMenus).map(([id, menu]) => (
          <Menu.SubMenu
            key={id}
            title={menu.nombre}
            icon={iconMap[menu.icono] || <IoIosSettings />}
          >
            {menu.opciones.map((opcion: any) => (
              <Menu.Item key={opcion.link}>
                <Link to={`/dashboard/${opcion.link}`}>{opcion.nombre}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
};
