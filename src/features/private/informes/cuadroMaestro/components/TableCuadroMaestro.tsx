import { IResponseCuadroMaestro } from "@/features/private/informes/cuadroMaestro/interfaces/cuadroMaestro.interfaces";
import { ColumnsType } from "antd/es/table";
import { Table, Tag, Input, DatePicker, Row, Col, Card, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface Props {
  cuadroMaestro: IResponseCuadroMaestro[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  setFilters: (filters: {
    search?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  isLoading?: boolean;
}

export const TableCuadroMaestro = ({
  cuadroMaestro,
  total,
  page,
  setPage,
  limit,
  setLimit,
  setFilters,
  isLoading,
}: Props) => {
  // Estados provisionales (mientras el usuario escribe/selecciona)
  const [pendingSearchText, setPendingSearchText] = useState("");
  const [pendingDateRange, setPendingDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const handleSearch = () => {
    setFilters({
      search: pendingSearchText,
      startDate: pendingDateRange[0]?.format("YYYY-MM-DD"),
      endDate: pendingDateRange[1]?.format("YYYY-MM-DD"),
    });
    setPage(1); // Reiniciar a la primera página cuando se busca
  };

  const handleClear = () => {
    setPendingSearchText("");
    setPendingDateRange([null, null]);
    setFilters({});
    setPage(1);
  };

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
        const declaracion = record.declaracionConformidad?.[0];
        if (!declaracion) return "-";

        const isConforme = declaracion.instalacionConforme;
        const resultado = isConforme ? "CONFORME" : "NO CONFORME";
        const color = isConforme ? "green" : "red";

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
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
        <Col xs={24} lg={8}>
          <Input
            placeholder="Buscar por usuario, inspector, dirección, medidor..."
            prefix={<SearchOutlined />}
            value={pendingSearchText}
            onChange={(e) => setPendingSearchText(e.target.value)}
            allowClear
            onPressEnter={handleSearch}
          />
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <DatePicker
            placeholder="Desde"
            style={{ width: "100%" }}
            value={pendingDateRange[0]}
            onChange={(date) => setPendingDateRange([date, pendingDateRange[1]])}
          />
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <DatePicker
            placeholder="Hasta"
            style={{ width: "100%" }}
            value={pendingDateRange[1]}
            onChange={(date) => setPendingDateRange([pendingDateRange[0], date])}
          />
        </Col>
        <Col xs={24} xl={24}>
          <div className="flex flex-wrap gap-2 items-center">
            <Button type="primary" onClick={handleSearch}>
              Buscar
            </Button>
            <Button onClick={handleClear}>Limpiar</Button>
            <span className="text-gray-500 ml-auto whitespace-nowrap">
              Mostrando página <strong>{page}</strong> | Total:{" "}
              <strong>{total}</strong> registros
            </span>
          </div>
        </Col>
      </Row>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={cuadroMaestro}
          rowKey="id_inspeccion"
          loading={isLoading}
          className="custom-table"
          rowClassName={(_record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          scroll={{ x: 2200 }}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPage(p);
              setLimit(s);
            },
            pageSizeOptions: ["10", "25", "50", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} registros`,
          }}
        />
      </div>
    </Card>
  );
};
