import { useCuadroMaestro } from "@/features/private/informes/cuadroMaestro/hooks";
import { TableCuadroMaestro } from "@/features/private/informes/cuadroMaestro/components";
import { Spin } from "antd";

export const CuadroMaestro = () => {
  const { cuadroMaestro, isLoading, isError, error } = useCuadroMaestro();

  return (
    <div className="mt-8">
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
          Ocurrió un error al cargar el cuadro maestro.
          <br />
          {error instanceof Error
            ? error.message
            : "Inténtalo de nuevo más tarde."}
        </div>
      ) : (
        <TableCuadroMaestro cuadroMaestro={cuadroMaestro} />
      )}
    </div>
  );
};
