import { IInspecciones } from "@/features/private/inspeccion/inspecciones/interfaces";
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
  FileImageOutlined,
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
  autorizarEdicion: (inspeccionId: number) => void;
  isAutorizando: boolean;
  downloadImages: (id: number) => void;
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
  autorizarEdicion,
  isAutorizando,
  downloadImages,
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
  const [currentTipoInspeccion, setCurrentTipoInspeccion] = useState<
    number | null
  >(null);
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

  const openImageModal = (id: number, tipoInspeccion: number) => {
    setCurrentInspeccionId(id);
    setCurrentTipoInspeccion(tipoInspeccion);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentInspeccionId(null);
    setCurrentTipoInspeccion(null);
  };

  const tiposDeInspeccionOptions = [
    { label: "Periódica", value: "1" },
    { label: "Nueva", value: "2" },
    { label: "Matriz", value: "3" },
  ];

  const hasFilters = !!(
    filters.numeroActa ||
    filters.inspector ||
    filters.tipoInspeccion ||
    filters.startDate ||
    filters.endDate
  );

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
      title: "N° Informe",
      key: "informe",
      render: (_, record) => {
        const id = Number(record?.tipoInspeccion?.id_tipo_inspeccion);
        const numeroActa = record?.ruta?.numero_acta || "";
        let prefijo = record?.tipoInspeccion?.nombre || "";

        if (id === 1) prefijo = "PD";
        if (id === 2) prefijo = "NRD";

        return `${prefijo} ${numeroActa}`.trim();
      },
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
              onClick={() =>
                openImageModal(
                  record.id_inspeccion,
                  record.tipoInspeccion?.id_tipo_inspeccion,
                )
              }
            />
          </Tooltip>
          <Tooltip title="Descargar Imágenes (ZIP)">
            <Button
              size="small"
              icon={<FileImageOutlined />}
              onClick={() => downloadImages(record.id_inspeccion)}
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
            <div className="flex items-center gap-2">
              <SearchOutlined />
              <span className="font-semibold">Filtros de Búsqueda</span>
            </div>
          </div>
        }
      >
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} lg={16}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={6}>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Rango Fechas
                </label>
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
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Tipo Inspección
                </label>
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
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Inspector
                </label>
                <Input
                  placeholder="Buscar nombre..."
                  value={searchTermInspector}
                  onChange={(e) => setSearchTermInspector(e.target.value)}
                  allowClear
                  onPressEnter={handleSearch}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Número Acta
                </label>
                <Input
                  placeholder="N° Acta..."
                  value={searchTermActa}
                  onChange={(e) => setSearchTermActa(e.target.value)}
                  allowClear
                  onPressEnter={handleSearch}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={8}>
            <div className="flex flex-col sm:flex-row justify-end items-end gap-3 h-full pb-[2px]">
              <Space className="w-full sm:w-auto justify-end">
                <Button
                  onClick={handleClearFilters}
                  block
                  className="min-w-[100px]"
                >
                  Limpiar
                </Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  block
                  className="min-w-[100px]"
                >
                  Buscar
                </Button>
              </Space>
            </div>
          </Col>
        </Row>

        <div className="mt-6 pt-4 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 italic">
            * Use los filtros para encontrar inspecciones específicas y
            descargarlas de forma masiva.
          </div>
          <Space wrap className="w-full sm:w-auto justify-end">
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
                    disabled: !hasFilters,
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
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={inspecciones}
        rowKey="id_inspeccion"
        className="custom-table"
        scroll={{ x: 900 }}
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
        currentTipoInspeccion={currentTipoInspeccion}
        getImagenPorTipo={getImagenPorTipo}
      />
    </div>
  );
};
