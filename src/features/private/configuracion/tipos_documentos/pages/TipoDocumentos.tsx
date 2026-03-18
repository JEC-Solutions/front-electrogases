import { useTiposDocumentos } from "@/features/private/configuracion/tipos_documentos/hooks";
import { Button, Card, Spin } from "antd";
import {
  TableTipoDocumentos,
  ModalTipoDocumentos,
} from "@/features/private/configuracion/tipos_documentos/components";

export const TipoDocumentos = () => {
  const {
    error,
    isError,
    isLoading,
    tipoDocumentos,
    handleOpen,
    currentTipoDocumentos,
    handleClose,
    handleDelete,
    onSubmit,
    open,
    openCurrentTipoDocumento,
    toggleTipoDocumentoStatus,
    methodsTipoDocumentos,
  } = useTiposDocumentos();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tipos de Documentos</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los diferentes tipos de documentos de identidad permitidos en el sistema.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Tipo de Documento
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
            Ocurrió un error al cargar los tipos de documentos.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableTipoDocumentos
            tipoDocumentos={tipoDocumentos}
            onOpenCurrent={openCurrentTipoDocumento}
            onDelete={handleDelete}
            onStatus={toggleTipoDocumentoStatus}
          />
        )}
      </Card>
      
      <ModalTipoDocumentos
        open={open}
        onClose={handleClose}
        methods={methodsTipoDocumentos}
        onSubmit={onSubmit}
        currentTipoDocumento={currentTipoDocumentos}
      />
    </div>
  );
};
