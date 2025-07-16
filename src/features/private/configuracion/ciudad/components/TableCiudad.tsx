import { ICiudades } from "@/features/private/configuracion/ciudad/interfaces";
import { Button, Space, Table, Tooltip } from "antd";
import { FaEdit } from "react-icons/fa";

interface Props {
  ciudades: ICiudades[];
  onOpenCurrent: (departamento: ICiudades) => void;
}

export const TableCiudad = ({ ciudades, onOpenCurrent }: Props) => {
  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      render: (_text: any, record: ICiudades) =>
        record.departamento?.nombre || "-",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: ICiudades) => (
        <Space>
          <Tooltip title="Editar Ciudad">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
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
        dataSource={ciudades}
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
