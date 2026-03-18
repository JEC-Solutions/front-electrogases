import { useRoles } from "@/features/private/configuracion/roles/hooks";
import {
  TableRoles,
  ModalRoles,
  ModalPermisos,
} from "@/features/private/configuracion/roles/components";
import { Button, Card, Spin } from "antd";

export const Roles = () => {
  const {
    roles,
    error,
    methodsRoles,
    isError,
    isLoading,
    onSubmit,
    handleClose,
    handleOpen,
    open,
    currentRol,
    openCurrentRol,
    handleDelete,
    toggleRoleStatus,
    methosPermisos,
    onSubmitPermisos,
    opciones,
    handleClosePermisos,
    openPermisos,
    openPermisosRol,
    permisosRol,
  } = useRoles();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los roles del sistema, así como asignar sus permisos correspondientes.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Rol
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
            Ocurrió un error al cargar los roles.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableRoles
            roles={roles}
            onOpenCurrentRol={openCurrentRol}
            onDelete={handleDelete}
            onStatus={toggleRoleStatus}
            openPermisosRol={openPermisosRol}
          />
        )}
      </Card>

      <ModalRoles
        open={open}
        onClose={handleClose}
        methods={methodsRoles}
        onSubmit={onSubmit}
        currentRol={currentRol}
      />

      <ModalPermisos
        open={openPermisos}
        onClose={handleClosePermisos}
        methods={methosPermisos}
        onSubmit={onSubmitPermisos}
        opciones={opciones}
        permisosRol={permisosRol}
        currentRol={currentRol}
      />
    </div>
  );
};
