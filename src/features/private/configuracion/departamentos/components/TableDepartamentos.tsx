import {
  IDepartamentos,
} from "@/features/private/configuracion/departamentos/interfaces";
import { Button, Space, Table, Tooltip } from "antd";
import { FaEdit } from "react-icons/fa";

interface Props {
  departamentos: IDepartamentos[];
  onOpenCurrent: (departamento: IDepartamentos) => void;
}

export const TableDepartamentos = ({ departamentos, onOpenCurrent }: Props) => {
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
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: IDepartamentos) => (
        <Space>
          <Tooltip title="Editar Departamento">
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
        dataSource={departamentos}
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
