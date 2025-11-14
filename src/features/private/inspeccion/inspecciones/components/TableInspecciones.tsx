import { IInspecciones } from "@/features/private/inspeccion/inspecciones/interfaces";
import { ColumnsType } from "antd/es/table";
import { Button, Space, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  inspecciones: IInspecciones[];
}

export const TableInspecciones = ({ inspecciones }: Props) => {
  const navigate = useNavigate();

  const handleRedirect = (id: number) => {
    navigate(`/dashboard/inspecciones/${id}`);
  };

  const columns: ColumnsType<IInspecciones> = [
    {
      title: "Fecha inspección",
      dataIndex: "fecha_inspeccion",
      key: "fecha_inspeccion",
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString("es-CO") : "-",
    },
    {
      title: "Fecha expedición",
      dataIndex: "fecha_expedicion",
      key: "fecha_expedicion",
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString("es-CO") : "-",
    },
    {
      title: "Tipo de inspección",
      key: "co",
      render: (_, record) => record?.tipoInspeccion.nombre || "",
    },
    {
      title: "Inspector",
      key: "inspector",
      render: (_, record) => {
        const persona = record.ruta?.persona;
        if (!persona) return "";

        const nombreCompleto = [
          persona.primer_nombre,
          persona.segundo_nombre,
          persona.primer_apellido,
          persona.segundo_apellido,
        ]
          .filter(Boolean)
          .join(" ");

        return nombreCompleto;
      },
    },
    {
      title: "Número de acta",
      key: "co",
      render: (_, record) => record?.ruta?.numero_acta || "",
    },
    {
      title: "Acciones",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Ver detalle">
            <Button
              size="small"
              type="link"
              onClick={() => {
                handleRedirect(record.id_inspeccion);
              }}
            >
              Ver
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={inspecciones}
        rowKey="id"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        scroll={{ x: 600 }}
      />
    </div>
  );
};
