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
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menús</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los menús del sistema y sus accesos.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Menu
        </Button>
      </div>

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
            Ocurrió un error al cargar los menús.
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
