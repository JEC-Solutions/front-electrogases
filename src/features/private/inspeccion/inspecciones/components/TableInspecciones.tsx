import {
  IInspecciones,
  ITipoImagen,
} from "@/features/private/inspeccion/inspecciones/interfaces";
import { ColumnsType } from "antd/es/table";
import {
  Button,
  Space,
  Table,
  Tooltip,
  Select,
  Input,
  DatePicker,
  Row,
  Col,
  Card,
  Popconfirm,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CameraOutlined,
  DownloadOutlined,
  EyeOutlined,
  FilePdfOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { ModalImagenesInspeccion } from "./ModalImagenesInspeccion";
import { InspeccionesFilters } from "../services/inspecciones.services";

const { RangePicker } = DatePicker;

type PrintType = "all" | "first_page" | "first_two_pages";

interface Props {
  inspecciones: IInspecciones[];
  downloadPdf: (id: number) => void;
  downloadMassivePdf: (
    ids?: number[],
    printType?: string,
    filters?: InspeccionesFilters,
  ) => void;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number,
  ) => Promise<any>;
  tiposImagenes: ITipoImagen[];
  isLoadingTipos: boolean;
  autorizarEdicion: (inspeccionId: number) => void;
  isAutorizando: boolean;
  // Paginación
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: InspeccionesFilters;
  handleFilterChange: (filters: Partial<InspeccionesFilters>) => void;
  handlePageChange: (page: number) => void;
  isLoading?: boolean;
}

export const TableInspecciones = ({
  inspecciones,
  downloadPdf,
  downloadMassivePdf,
  getImagenPorTipo,
  tiposImagenes,
  isLoadingTipos,
  autorizarEdicion,
  isAutorizando,
  pagination,
  filters,
  handleFilterChange,
  handlePageChange,
  isLoading,
}: Props) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInspeccionId, setCurrentInspeccionId] = useState<number | null>(
    null,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [printType, setPrintType] = useState<PrintType>("all");

  // --- Estados locales para los filtros (UI) ---
  const [searchTermActa, setSearchTermActa] = useState("");
  const [searchTermInspector, setSearchTermInspector] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  // Aplicar todos los filtros al hacer click en Buscar
  const handleSearch = () => {
    handleFilterChange({
      numeroActa: searchTermActa || undefined,
      inspector: searchTermInspector || undefined,
      tipoInspeccion: selectedTipo || undefined,
      startDate: dateRange?.[0]?.format("YYYY-MM-DD") || undefined,
      endDate: dateRange?.[1]?.format("YYYY-MM-DD") || undefined,
    });
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setSearchTermActa("");
    setSearchTermInspector("");
    setSelectedTipo(null);
    setDateRange(null);
    handleFilterChange({
      numeroActa: undefined,
      inspector: undefined,
      tipoInspeccion: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  const handleRedirect = (id: number) => {
    navigate(`/dashboard/inspecciones/${id}`);
  };

  const openImageModal = (id: number) => {
    setCurrentInspeccionId(id);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentInspeccionId(null);
  };

  const tiposDeInspeccionOptions = [
    { label: "Periódica", value: "1" },
    { label: "Nueva", value: "2" },
    { label: "Matriz", value: "3" },
  ];

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
      title: "Autorizar Edición",
      key: "autorizarEdicion",
      align: "center",
      render: (_, record) => {
        const yaAutorizado = record.editar_informe;
        return (
          <Tooltip
            title={
              yaAutorizado
                ? "Desautorizar edición del informe"
                : "Autorizar edición del informe"
            }
          >
            <Popconfirm
              title={
                yaAutorizado
                  ? "¿Desautorizar edición de este informe?"
                  : "¿Autorizar edición de este informe?"
              }
              onConfirm={() => autorizarEdicion(record.id_inspeccion)}
              okText={yaAutorizado ? "Sí, desautorizar" : "Sí, autorizar"}
              cancelText="Cancelar"
            >
              <Button
                type="text"
                loading={isAutorizando}
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: 18,
                      color: yaAutorizado ? "#52c41a" : "#faad14",
                    }}
                  />
                }
              />
            </Popconfirm>
          </Tooltip>
        );
      },
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
              type="primary"
              icon={<EyeOutlined style={{ fontSize: 16 }} />}
              onClick={() => {
                handleRedirect(record.id_inspeccion);
              }}
            />
          </Tooltip>
          <Tooltip title="Ver Imágenes">
            <Button
              size="small"
              style={{
                backgroundColor: "#faad14",
                borderColor: "#faad14",
                color: "#fff",
              }}
              icon={<CameraOutlined />}
              onClick={() => openImageModal(record.id_inspeccion)}
            />
          </Tooltip>
          <Tooltip title="Generar PDF">
            <Button
              size="small"
              type="default"
              danger
              icon={<FilePdfOutlined style={{ fontSize: 16 }} />}
              onClick={() => {
                downloadPdf(record.id_inspeccion);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      {/* --- SECCIÓN DE FILTROS --- */}
      <Card
        size="small"
        style={{ marginBottom: 16 }}
        title={
          <Space>
            <SearchOutlined /> Filtros de Búsqueda
          </Space>
        }
        extra={
          <Space>
            <Select
              value={printType}
              onChange={(val) => setPrintType(val)}
              style={{ width: 180 }}
              options={[
                { label: "Todas las páginas", value: "all" },
                { label: "Solo primera página", value: "first_page" },
                { label: "Primeras 2 páginas", value: "first_two_pages" },
              ]}
            />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "seleccionados",
                    label: `Descargar Seleccionados (${selectedRowKeys.length})`,
                    disabled: selectedRowKeys.length === 0,
                    onClick: () =>
                      downloadMassivePdf(
                        selectedRowKeys as number[],
                        printType,
                      ),
                  },
                  {
                    key: "filtrados",
                    label: "Descargar Filtrados (Todos)",
                    onClick: () =>
                      downloadMassivePdf(undefined, printType, filters),
                  },
                ],
              }}
            >
              <Button type="primary" icon={<DownloadOutlined />}>
                Descargar <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Rango Fechas:</label>
            <RangePicker
              style={{ width: "100%" }}
              value={dateRange}
              onChange={(val) =>
                setDateRange(val as [Dayjs | null, Dayjs | null] | null)
              }
              format="YYYY-MM-DD"
              placeholder={["Inicio", "Fin"]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Tipo Inspección:</label>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Todos"
              value={selectedTipo}
              options={tiposDeInspeccionOptions}
              onChange={(val) => setSelectedTipo(val)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Inspector:</label>
            <Input
              placeholder="Buscar por nombre..."
              value={searchTermInspector}
              onChange={(e) => setSearchTermInspector(e.target.value)}
              allowClear
              onPressEnter={handleSearch}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Número Acta:</label>
            <Input
              placeholder="Buscar acta..."
              value={searchTermActa}
              onChange={(e) => setSearchTermActa(e.target.value)}
              allowClear
              onPressEnter={handleSearch}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }} justify="end">
          <Space>
            <Button onClick={handleClearFilters}>Limpiar</Button>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Space>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={inspecciones}
        rowKey="id_inspeccion"
        className="custom-table"
        scroll={{ x: 600 }}
        loading={isLoading}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} inspecciones`,
          onChange: handlePageChange,
        }}
      />

      <ModalImagenesInspeccion
        isModalOpen={isModalOpen}
        onClose={closeImageModal}
        currentInspeccionId={currentInspeccionId}
        tiposImagenes={tiposImagenes}
        isLoadingTipos={isLoadingTipos}
        getImagenPorTipo={getImagenPorTipo}
      />
    </div>
  );
};
