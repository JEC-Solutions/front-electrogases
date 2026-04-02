import { Menu, Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSidebar } from "@/features/private/dashboard/hooks";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { JSX } from "react";

import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, JSX.Element> = {
  IoIosSettings: <IoIosSettings />,
  SiGoogleforms: <SiGoogleforms />,
  IoIosSearch: <IoIosSearch />,
  FaUserTie: <FaUserTie />,
};

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
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

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const initialOpenKeys = Object.entries(groupedMenus)
        .filter(([_, menu]) =>
          menu.opciones.some((op) => `/dashboard/${op.link}` === location.pathname)
        )
        .map(([id]) => id);
      setOpenKeys(initialOpenKeys);
    }
  }, [location.pathname, isLoading]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3 px-2">
            <Skeleton.Avatar active size="small" shape="square" className="flex-shrink-0" />
            <Skeleton.Input active size="small" block className="rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  const menuItems = [
    {
      key: "inicio",
      icon: <AiFillHome />,
      label: <Link to="/dashboard/inicio">Inicio</Link>,
    },
    ...Object.entries(groupedMenus).map(([id, menu]) => ({
      key: id,
      icon: iconMap[menu.icono] || <IoIosSettings />,
      label: menu.nombre,
      children: menu.opciones.map((opcion: any) => ({
        key: opcion.link,
        label: (
          <Link to={`/dashboard/${opcion.link}`} className="flex items-center">
            <span className="submenu-dot" />
            {opcion.nombre}
          </Link>
        ),
      })),
    })),
  ];

  return (
    <div className="flex flex-col h-full custom-sidebar overflow-hidden transition-all duration-300">
      <div className={`h-[64px] my-6 flex items-center transition-all duration-300 ${collapsed ? 'justify-center' : 'justify-center px-4'}`}>
        <Link to="/dashboard/inicio" className="flex items-center gap-3 no-underline group">
          <motion.div 
            layout
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all duration-300 flex-shrink-0"
          >
            <img
              src="/imagenes/logo.png"
              alt="Logo"
              className={`${collapsed ? 'w-6 h-6' : 'w-8 h-8'} object-contain transition-all duration-300`}
            />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-white font-bold text-lg tracking-tight drop-shadow-md truncate"
              >
                JEC GAS
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2 scroll-smooth">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath || "inicio"]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="border-none"
          items={menuItems}
        />
      </div>
    </div>
  );
};
