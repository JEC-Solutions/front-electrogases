import { IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { FiDownload, FiFileText } from "react-icons/fi";
import { getGreenOutlineButtonProps, getRedOutlineButtonProps } from "@/ui";

interface Props {
  rutas: IRutas[];
}

export const TableRutas = ({ rutas }: Props) => {
  const [query, setQuery] = useState("");

  const columns: ColumnsType<IRutas> = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
      render: (val: string) => (val ? val.slice(0, 5) : ""),
    },
    {
      title: "Inspector",
      key: "persona",
      render: (_: unknown, record) => {
        const p = record.persona;
        return p ? `${p.primer_nombre} ${p.primer_apellido}` : "Sin asignar";
      },
    },
    {
      title: "Dirección",
      key: "direccion",
      dataIndex: ["casa", "direccion"],
    },
    {
      title: "Barrio",
      key: "barrio",
      dataIndex: ["casa", "barrio"],
    },
    {
      title: "Cliente",
      key: "cliente",
      render: (_: unknown, record) => {
        const c = record.casa?.cliente;
        return c ? `${c.primer_nombre} ${c.primer_apellido}` : "—";
      },
    },
  ];

  const filtered = useMemo(() => {
    if (!query.trim()) return rutas;
    const q = query.toLowerCase();

    return rutas.filter((r) => {
      const inspector = r.persona
        ? `${r.persona.primer_nombre} ${r.persona.primer_apellido}`
        : "";
      const cliente = r.casa?.cliente
        ? `${r.casa.cliente.primer_nombre} ${r.casa.cliente.primer_apellido}`
        : "";
      const haystack = [
        r.fecha,
        r.hora,
        inspector,
        r.casa?.direccion,
        r.casa?.barrio,
        cliente,
        (r.casa as any)?.no_cuenta,
        (r.casa as any)?.medidor,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [rutas, query]);

  return (
    <div className="overflow-x-auto">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Buscar por fecha, inspector, dirección, cliente, etc."
            allowClear
            enterButton="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={(v) => setQuery(v)}
            style={{ maxWidth: 520 }}
          />

          <Space>
            <Button
              icon={<FiDownload size={18} />}
              {...getGreenOutlineButtonProps()}
            >
              Exportar Excel
            </Button>

            <Button
              icon={<FiFileText size={18} />}
              {...getRedOutlineButtonProps()}
            >
              Exportar PDF
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id_ruta"
          className="custom-table"
          rowClassName={(_record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          scroll={{ x: 600 }}
        />
      </Space>
    </div>
  );
};
