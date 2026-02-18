import { IEquiposUtilizados } from "@/features/private/inspectores/equiposUtilizados/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  equipos: IEquiposUtilizados[];
  onOpenCurrent: (equipo: IEquiposUtilizados) => void;
  onDelete: (id: number) => void;
}

export const TableEquiposUtilizados = ({
  equipos,
  onOpenCurrent,
  onDelete,
}: Props) => {
  const columns = [
    {
      title: "Equipo",
      dataIndex: "equiposUtilizados",
      key: "equiposUtilizados",
    },
    {
      title: "NS",
      dataIndex: "ns",
      key: "ns",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Inspectores",
      key: "inspectores",
      render: (_: any, record: IEquiposUtilizados) => (
        <Space direction="vertical">
          {record.equiposUsuarios?.map((eu) => (
            <Tag key={eu.id_equipos_usuarios} color="blue">
              {eu.idPersona.primer_nombre} {eu.idPersona.primer_apellido}
            </Tag>
          )) || "-"}
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: IEquiposUtilizados) => (
        <Space>
          <Tooltip title="Editar Equipo">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          <Tooltip title="Eliminar Equipo">
            <Button
              type="link"
              onClick={() => onDelete(record.id_equipos_utilizados)}
            >
              <FaTrash style={{ color: "#ff4d4f" }} />
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
        dataSource={equipos}
        rowKey="id_equipos_utilizados"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        scroll={{ x: 600 }}
      />
    </div>
  );
};
