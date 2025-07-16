import { useMenu } from "@/features/private/configuracion/menus/hooks";
import { Button, Card, Spin } from "antd";
import {
  TableMenu,
  ModalMenu,
} from "@/features/private/configuracion/menus/components";

export const Menu = () => {
  const {
    currentMenu,
    error,
    handleClose,
    handleDelete,
    handleOpen,
    isError,
    isLoading,
    menus,
    methodsMenus,
    onSubmit,
    open,
    openCurrentMenu,
    toggleMenuStatus,
  } = useMenu();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Menu
      </Button>

      <Card>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Spin />
          </div>
        ) : isError ? (
          <div style={{ color: "red", textAlign: "center" }}>
            Ocurrió un error al cargar los roles.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableMenu
            menus={menus}
            onOpenCurrent={openCurrentMenu}
            onDelete={handleDelete}
            onStatus={toggleMenuStatus}
          />
        )}
      </Card>

      <ModalMenu
        open={open}
        onClose={handleClose}
        methods={methodsMenus}
        onSubmit={onSubmit}
        currentMenu={currentMenu}
      />
    </div>
  );
};
