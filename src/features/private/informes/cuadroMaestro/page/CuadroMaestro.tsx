import { useCuadroMaestro } from "@/features/private/informes/cuadroMaestro/hooks";
import { TableCuadroMaestro } from "@/features/private/informes/cuadroMaestro/components";
import { Button, Spin, Space, Typography } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const CuadroMaestro = () => {
  const { cuadroMaestro, isLoading, isError, error, exportExcel, isExporting } =
    useCuadroMaestro();

  return (
    <div className="mt-8">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Cuadro Maestro
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={exportExcel}
            loading={isExporting}
          >
            Exportar Excel
          </Button>
        </Space>
      </div>

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
