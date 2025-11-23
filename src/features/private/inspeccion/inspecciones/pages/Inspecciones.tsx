import { useInspecciones } from "@/features/private/inspeccion/inspecciones/hooks";
import { Card, Spin } from "antd";
import { TableInspecciones } from "@/features/private/inspeccion/inspecciones/components";

export const Inspecciones = () => {
  const {
    error,
    inspecciones,
    isError,
    isLoading,
    downloadPdf,
  } = useInspecciones();

  return (
    <div className="mt-8">
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
            Ocurrió un error al cargar las inspecciones.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableInspecciones
            inspecciones={inspecciones}
            downloadPdf={downloadPdf}
          />
        )}
      </Card>
    </div>
  );
};
