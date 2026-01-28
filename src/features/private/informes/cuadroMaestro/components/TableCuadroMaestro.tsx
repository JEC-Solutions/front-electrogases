import { IResponseCuadroMaestro } from "@/features/private/informes/cuadroMaestro/interfaces/cuadroMaestro.interfaces";
import { ColumnsType } from "antd/es/table";
import { Table, Tag, Input, DatePicker, Row, Col, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface Props {
  cuadroMaestro: IResponseCuadroMaestro[];
}

export const TableCuadroMaestro = ({ cuadroMaestro }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const getFullName = (
    persona: {
      primer_nombre?: string;
      segundo_nombre?: string;
      primer_apellido?: string;
      segundo_apellido?: string;
    } | null,
  ) => {
    if (!persona) return "-";
    return [
      persona.primer_nombre,
      persona.segundo_nombre,
      persona.primer_apellido,
      persona.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getClasesUso = (
    clasesInspeccion: IResponseCuadroMaestro["clasesInspeccion"],
  ) => {
    if (!clasesInspeccion || clasesInspeccion.length === 0) return "-";
    return clasesInspeccion
      .map((c) => c.claseUso?.nombre || c.nombre)
      .filter(Boolean)
      .join(", ");
  };

  const filteredData = useMemo(() => {
    return cuadroMaestro.filter((record) => {
      if (dateRange[0] && dateRange[1]) {
        const recordDate = dayjs(record.fecha_inspeccion);
        if (!recordDate.isBetween(dateRange[0], dateRange[1], "day", "[]")) {
          return false;
        }
      }

      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const nombreUsuario = getFullName(record.ruta?.persona).toLowerCase();
        const nombreInspector = getFullName(
          record.ruta?.created_by,
        ).toLowerCase();
        const direccion = record.ruta?.casa?.direccion?.toLowerCase() || "";
        const barrio = record.ruta?.casa?.barrio?.toLowerCase() || "";
        const noCuenta = record.ruta?.casa?.no_cuenta?.toLowerCase() || "";
        const medidor = record.ruta?.casa?.medidor?.toLowerCase() || "";
        const numeroInforme = record.numero_informe?.toLowerCase() || "";
        const empresa = record.empresa?.toLowerCase() || "";

        return (
          nombreUsuario.includes(searchLower) ||
          nombreInspector.includes(searchLower) ||
          direccion.includes(searchLower) ||
          barrio.includes(searchLower) ||
          noCuenta.includes(searchLower) ||
          medidor.includes(searchLower) ||
          numeroInforme.includes(searchLower) ||
          empresa.includes(searchLower)
        );
      }

      return true;
    });
  }, [cuadroMaestro, searchText, dateRange]);

  const columns: ColumnsType<IResponseCuadroMaestro> = [
    {
      title: "Fecha Inspección",
      dataIndex: "fecha_inspeccion",
      key: "fecha_inspeccion",
      width: 120,
      render: (fecha: string) => dayjs(fecha).format("YYYY-MM-DD"),
      sorter: (a, b) =>
        dayjs(a.fecha_inspeccion).unix() - dayjs(b.fecha_inspeccion).unix(),
    },
    {
      title: "Tipo Informe",
      key: "tipo_informe",
      width: 120,
      render: (_, record) => record.tipoInspeccion?.nombre || "-",
    },
    {
      title: "Clase de Uso",
      key: "clase_uso",
      width: 150,
      render: (_, record) => getClasesUso(record.clasesInspeccion),
    },
    {
      title: "No. de Informe",
      key: "numero_informe",
      width: 140,
      render: (_, record) => {
        const numeroActa = record.ruta?.numero_acta;
        if (!numeroActa) return "-";
        const isPeriodica =
          record.tipoInspeccion?.nombre?.toLowerCase().includes("periódica") ||
          record.tipoInspeccion?.nombre?.toLowerCase().includes("periodica");
        const prefix = isPeriodica ? "P" : "NA";
        return `${prefix}${numeroActa}`;
      },
    },
    {
      title: "Tipo de Gas",
      key: "tipo_gas",
      width: 100,
      render: (_, record) => (record.tipo_gas_glp ? "GLP" : "GN"),
    },
    {
      title: "Dirección",
      key: "direccion",
      width: 200,
      render: (_, record) => record.ruta?.casa?.direccion || "-",
    },
    {
      title: "Barrio",
      key: "barrio",
      width: 150,
      render: (_, record) => record.ruta?.casa?.barrio || "-",
    },
    {
      title: "Nombre Usuario",
      key: "nombre_usuario",
      width: 180,
      render: (_, record) => getFullName(record.ruta?.cliente),
    },
    {
      title: "Teléfono",
      key: "telefono",
      width: 120,
      render: (_, record) => record.ruta?.cliente?.telefono || "-",
    },
    {
      title: "No. de Cuenta",
      key: "no_cuenta",
      width: 150,
      render: (_, record) => record.ruta?.casa?.no_cuenta || "-",
    },
    {
      title: "Número de Medidor",
      key: "medidor",
      width: 150,
      render: (_, record) => record.ruta?.casa?.medidor || "-",
    },
    {
      title: "Ciudad",
      key: "ciudad",
      width: 120,
      render: (_, record) => record.ruta?.casa?.ciudad?.nombre || "-",
    },
    {
      title: "Nombre Inspector",
      key: "nombre_inspector",
      width: 180,
      render: (_, record) => getFullName(record.ruta?.persona),
    },
    {
      title: "Resultado",
      key: "resultado",
      width: 120,
      render: (_, record) => {
        const resultado = record.ruta?.resultado?.nombre;
        if (!resultado) return "-";

        let color = "default";
        if (resultado.toUpperCase().includes("CONFORME")) {
          color = "green";
        } else if (resultado.toUpperCase().includes("NO CONFORME")) {
          color = "red";
        } else if (resultado.toUpperCase().includes("PENDIENTE")) {
          color = "orange";
        }

        return <Tag color={color}>{resultado}</Tag>;
      },
    },
    {
      title: "Distribuidora",
      dataIndex: "empresa",
      key: "empresa",
      width: 150,
      render: (value: string) => value || "-",
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Buscar..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <RangePicker
            style={{ width: "100%" }}
            placeholder={["Fecha inicio", "Fecha fin"]}
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates as [Dayjs | null, Dayjs | null])
            }
          />
        </Col>
        <Col xs={24} md={8}>
          <span style={{ lineHeight: "32px" }}>
            Total: <strong>{filteredData.length}</strong> registros
          </span>
        </Col>
      </Row>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id_inspeccion"
          className="custom-table"
          rowClassName={(_record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          scroll={{ x: 2200 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["10", "25", "50", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} registros`,
          }}
        />
      </div>
    </Card>
  );
};
