import { Table, Card } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface Props {
  data: any[];
  loading: boolean;
  pagination: any;
  onPageChange: (page: number, pageSize?: number) => void;
}

export const SisercoTable = ({ data, loading, pagination, onPageChange }: Props) => {
  const columns: ColumnsType<any> = [
    {
      title: "Número",
      dataIndex: "numero",
      key: "numero",
      width: 120,
    },
    {
      title: "Fecha Expedición",
      dataIndex: "fechaExpedicion",
      key: "fechaExpedicion",
      width: 150,
      render: (fecha: string) => dayjs(fecha).format("YYYY-MM-DD"),
    },
    {
      title: "Tipo ID Cliente",
      dataIndex: "tipoIdentificacion",
      key: "tipoIdentificacion",
      width: 120,
    },
    {
      title: "Número ID Cliente",
      dataIndex: "numeroIdentificacion",
      key: "numeroIdentificacion",
      width: 150,
    },
    {
      title: "Razón Social",
      dataIndex: "razonSocial",
      key: "razonSocial",
      width: 250,
    },
    {
      title: "Nombre Archivo",
      dataIndex: "nombreArchivo",
      key: "nombreArchivo",
      width: 200,
    },
    {
      title: "ID Reglamento",
      dataIndex: "idReglamentoTecnico",
      key: "idReglamentoTecnico",
      width: 200,
    },
    {
      title: "Tipos de Instalación",
      dataIndex: "tiposInstalacion",
      key: "tiposInstalacion",
      width: 300,
    },
    {
      title: "Condición Instalación",
      dataIndex: "condicionInstalacion",
      key: "condicionInstalacion",
      width: 180,
    },
    {
      title: "ID Único Instalación",
      dataIndex: "identificadorUnicoInstalacion",
      key: "identificadorUnicoInstalacion",
      width: 180,
    },
    {
      title: "Código Departamento",
      dataIndex: "codigoDepartamento",
      key: "codigoDepartamento",
      width: 200,
    },
    {
      title: "Código Municipio",
      dataIndex: "codigoMunicipio",
      key: "codigoMunicipio",
      width: 200,
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      width: 250,
    },
    {
      title: "Tipo ID Inspector",
      dataIndex: "tipoIdentificacionInspector",
      key: "tipoIdentificacionInspector",
      width: 150,
    },
    {
      title: "Número ID Inspector",
      dataIndex: "numeroIdentificacionInspector",
      key: "numeroIdentificacionInspector",
      width: 150,
    },
    {
      title: "Nombre Inspector",
      dataIndex: "nombreInspector",
      key: "nombreInspector",
      width: 250,
    },
  ];

  return (
    <Card className="mt-4">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        scroll={{ x: 2500 }}
        pagination={{
          current: pagination?.page || 1,
          pageSize: pagination?.limit || 10,
          total: pagination?.total || 0,
          onChange: onPageChange,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
        }}
      />
    </Card>
  );
};
