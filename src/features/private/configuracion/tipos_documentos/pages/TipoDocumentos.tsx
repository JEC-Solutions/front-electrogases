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
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Tipo de Documento
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

        <ModalTipoDocumentos
          open={open}
          onClose={handleClose}
          methods={methodsTipoDocumentos}
          onSubmit={onSubmit}
          currentTipoDocumento={currentTipoDocumentos}
        />
      </Card>
    </div>
  );
};
