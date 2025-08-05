import { IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { Table } from "antd";

interface Props {
  rutas: IRutas[];
}

export const TableRutas = ({ rutas }: Props) => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "Inspector",
      key: "persona",
      render: (_: any, record: IRutas) => {
        const p = record.persona;
        return `${p.primer_nombre} ${p.primer_apellido}`;
      },
    },
    {
      title: "Dirección",
      key: "direccion",
      render: (_: any, record: IRutas) => {
        return record.casa.direccion;
      },
    },
    {
      title: "Barrio",
      key: "barrio",
      render: (_: any, record: IRutas) => {
        return record.casa.barrio;
      },
    },
    {
      title: "Cliente",
      key: "cliente",
      render: (_: any, record: IRutas) => {
        const c = record.casa.cliente;
        return `${c.primer_nombre} ${c.primer_apellido}`;
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={rutas}
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
