import { useUsuarios } from "@/features/private/configuracion/usuarios/hooks";
import { Button, Card, Spin, Input, Select, Space } from "antd";
import {
  TableUsuarios,
  ModalUsuarios,
} from "@/features/private/configuracion/usuarios/components";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { IRoles } from "@/features/private/configuracion/roles/interfaces";

export const Usuarios = () => {
  const {
    currentUsuarios,
    documentos,
    error,
    handleClose,
    handleOpen,
    isError,
    isLoading,
    methodsUsuarios,
    onSubmit,
    open,
    openCurrentUsuario,
    toggleStatus,
    usuarios,
    pagination,
    setPage,
    setLimit,
    setPendingSearch,
    setPendingIdRol,
    handleSearch,
    handleClear,
    pendingSearch,
    pendingIdRol,
    roles,
  } = useUsuarios();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los usuarios, asignar roles y controlar
          su estado.
        </p>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <div className="w-full xl:w-auto">
          <Button
            type="primary"
            className="w-full xl:w-auto"
            onClick={handleOpen}
          >
            Agregar Usuario
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          <Input
            placeholder="Buscar por nombre o email..."
            prefix={<SearchOutlined />}
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Filtrar por rol"
            className="w-full sm:w-96"
            allowClear
            value={pendingIdRol}
            onChange={(val) => setPendingIdRol(val)}
            options={roles
              .filter(
                (r) => r.id_rol !== Number(import.meta.env.VITE_INSPECTOR),
              )
              .map((r: IRoles) => ({
                label: r.nombre_rol.toUpperCase(),
                value: r.id_rol,
              }))}
          />
          <Space className="w-full sm:w-auto justify-end">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Buscar
            </Button>
            <Button icon={<DeleteOutlined />} onClick={handleClear}>
              Limpiar
            </Button>
          </Space>
        </div>
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
            Ocurrió un error al cargar los usuarios.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableUsuarios
            usuarios={usuarios}
            pagination={{
              total: pagination.total,
              page: pagination.page,
              limit: pagination.limit,
            }}
            onPaginationChange={(p, l) => {
              setPage(p);
              setLimit(l);
            }}
            onOpenCurrent={openCurrentUsuario}
            onStatus={toggleStatus}
          />
        )}
      </Card>

      <ModalUsuarios
        open={open}
        onClose={handleClose}
        methods={methodsUsuarios}
        onSubmit={onSubmit}
        currentUsuario={currentUsuarios}
        documentos={documentos}
      />
    </div>
  );
};
