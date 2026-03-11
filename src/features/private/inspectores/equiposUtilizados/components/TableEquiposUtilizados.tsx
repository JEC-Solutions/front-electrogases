import { IEquiposUtilizados } from "@/features/private/inspectores/equiposUtilizados/interfaces";
import { Button, Input, Select, Space, Table, Tag, Tooltip } from "antd";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  equipos: IEquiposUtilizados[];
  onOpenCurrent: (equipo: IEquiposUtilizados) => void;
  onDelete: (id: number) => void;
}

const tiposEquipo = [
  { value: "MANOMETRO ANALOGO MEDIO", label: "MANOMETRO ANALOGO MEDIO" },
  { value: "MANOMETRO ANALOGO BAJO", label: "MANOMETRO ANALOGO BAJO" },
  {
    value: "DETECTOR DE FUGAS DE PROPANO",
    label: "DETECTOR DE FUGAS DE PROPANO",
  },
  {
    value: "DETECTOR DE FUGAS DE METANO",
    label: "DETECTOR DE FUGAS DE METANO",
  },
  { value: "DETECTOR DE MONOXIDO", label: "DETECTOR DE MONOXIDO" },
  { value: "FLEXOMETRO", label: "FLEXOMETRO" },
  { value: "CALIBRADOR PIE DE REY", label: "CALIBRADOR PIE DE REY" },
  { value: "OTRO", label: "OTRO" },
];

export const TableEquiposUtilizados = ({
  equipos,
  onOpenCurrent,
  onDelete,
}: Props) => {
  const [filtroTipo, setFiltroTipo] = useState<string | undefined>(undefined);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroInspectores, setFiltroInspectores] = useState<number[]>([]);

  // Inspectores únicos derivados del listado de equipos
  const inspectoresUnicos = Array.from(
    new Map(
      equipos
        .flatMap((e) => e.equiposUsuarios ?? [])
        .map((eu) => [
          eu.idPersona.id_persona,
          {
            value: eu.idPersona.id_persona,
            label: `${eu.idPersona.primer_nombre} ${eu.idPersona.primer_apellido}`,
          },
        ]),
    ).values(),
  );

  const datos = equipos.filter((e) => {
    const matchTipo = filtroTipo ? e.equiposUtilizados === filtroTipo : true;
    const texto = filtroTexto.toLowerCase();
    const matchTexto =
      !texto ||
      e.ns?.toLowerCase().includes(texto) ||
      e.marca?.toLowerCase().includes(texto) ||
      e.modelo?.toLowerCase().includes(texto);
    const matchInspector =
      filtroInspectores.length === 0 ||
      e.equiposUsuarios?.some((eu) =>
        filtroInspectores.includes(eu.idPersona.id_persona),
      );
    return matchTipo && matchTexto && matchInspector;
  });

  const limpiarFiltros = () => {
    setFiltroTipo(undefined);
    setFiltroTexto("");
    setFiltroInspectores([]);
  };

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
      title: "Cód. Interno",
      dataIndex: "codigo_interno",
      key: "codigo_interno",
      render: (val: string | null) => val ?? "-",
    },
    {
      title: "Cert. Calibración",
      dataIndex: "certificado_calibracion",
      key: "certificado_calibracion",
      render: (val: string | null) => val ?? "-",
    },
    {
      title: "Rango Medición",
      dataIndex: "rango_medicion",
      key: "rango_medicion",
      render: (val: string | null) => val ?? "-",
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
      {/* Filtros */}
      <Space wrap style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filtrar por tipo de equipo"
          style={{ width: 240 }}
          options={tiposEquipo}
          value={filtroTipo}
          onChange={(val) => setFiltroTipo(val)}
          allowClear
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Input
          placeholder="Buscar por NS, marca o modelo..."
          style={{ width: 240 }}
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          allowClear
        />
        <Select
          mode="multiple"
          placeholder="Filtrar por inspector"
          style={{ minWidth: 240 }}
          options={inspectoresUnicos}
          value={filtroInspectores}
          onChange={(val) => setFiltroInspectores(val)}
          allowClear
          showSearch
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button onClick={limpiarFiltros}>Limpiar filtros</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={datos}
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
