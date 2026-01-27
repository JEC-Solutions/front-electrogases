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
  Badge,
  Modal,
  List,
  Tag,
  Popconfirm,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CameraOutlined,
  DownloadOutlined,
  EyeOutlined,
  FilePdfOutlined,
  SearchOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ModalImagenesInspeccion } from "./ModalImagenesInspeccion";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type PrintType = "all" | "first_page" | "first_two_pages";

interface ISolicitudEdicion {
  id_solicitud: number;
  observacion_inspector: string | null;
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  observacion_ingeniero: string | null;
  id_usuario_solicitante: number;
  id_usuario_aprobador: number | null;
  fecha_solicitud: string;
  fecha_aprobacion: string | null;
}

interface Props {
  inspecciones: IInspecciones[];
  downloadPdf: (id: number) => void;
  downloadMassivePdf: (ids: number[], printType?: PrintType) => void;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number,
  ) => Promise<any>;
  tiposImagenes: ITipoImagen[];
  isLoadingTipos: boolean;
  fetchSolicitudesEdicion: (
    inspeccionId: number,
  ) => Promise<ISolicitudEdicion[]>;
  responderSolicitud: (
    idSolicitud: number,
    estado: "APROBADO" | "RECHAZADO",
    observacion_ingeniero?: string,
    onSuccess?: () => void,
  ) => void;
  isRespondiendo: boolean;
}

export const TableInspecciones = ({
  inspecciones,
  downloadPdf,
  downloadMassivePdf,
  getImagenPorTipo,
  tiposImagenes,
  isLoadingTipos,
  fetchSolicitudesEdicion,
  responderSolicitud,
  isRespondiendo,
}: Props) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInspeccionId, setCurrentInspeccionId] = useState<number | null>(
    null,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [printType, setPrintType] = useState<PrintType>("all");

  // --- Estados para los filtros ---
  const [searchTermActa, setSearchTermActa] = useState("");
  const [searchTermInspector, setSearchTermInspector] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  // --- Estados para el modal de solicitudes ---
  const [isSolicitudesModalOpen, setIsSolicitudesModalOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState<ISolicitudEdicion[]>([]);
  const [isLoadingSolicitudes, setIsLoadingSolicitudes] = useState(false);
  const [observacionIngeniero, setObservacionIngeniero] = useState("");

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

  const openSolicitudesModal = async (id: number) => {
    setCurrentInspeccionId(id);
    setIsLoadingSolicitudes(true);
    setIsSolicitudesModalOpen(true);
    try {
      const data = await fetchSolicitudesEdicion(id);
      setSolicitudes(data);
    } catch (error) {
      console.error("Error cargando solicitudes:", error);
    } finally {
      setIsLoadingSolicitudes(false);
    }
  };

  const closeSolicitudesModal = () => {
    setIsSolicitudesModalOpen(false);
    setCurrentInspeccionId(null);
    setSolicitudes([]);
    setObservacionIngeniero("");
  };

  const handleResponder = (
    idSolicitud: number,
    estado: "APROBADO" | "RECHAZADO",
  ) => {
    responderSolicitud(idSolicitud, estado, observacionIngeniero, async () => {
      // Refrescar las solicitudes después de responder
      if (currentInspeccionId) {
        const data = await fetchSolicitudesEdicion(currentInspeccionId);
        setSolicitudes(data);
      }
    });
    setObservacionIngeniero("");
  };

  const filteredInspecciones = useMemo(() => {
    return inspecciones.filter((item) => {
      const acta = item.ruta?.numero_acta || "";
      const matchesActa = acta
        .toLowerCase()
        .includes(searchTermActa.toLowerCase());

      const persona = item.ruta?.persona;
      const nombreCompleto = persona
        ? [
            persona.primer_nombre,
            persona.segundo_nombre,
            persona.primer_apellido,
            persona.segundo_apellido,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
        : "";
      const matchesInspector = nombreCompleto.includes(
        searchTermInspector.toLowerCase(),
      );

      const matchesTipo = selectedTipo
        ? item.tipoInspeccion?.nombre === selectedTipo
        : true;

      let matchesDate = true;
      if (dateRange && dateRange[0] && dateRange[1]) {
        const fechaInsp = dayjs(item.fecha_inspeccion);
        matchesDate = fechaInsp.isBetween(
          dateRange[0],
          dateRange[1],
          "day",
          "[]",
        );
      }

      return matchesActa && matchesInspector && matchesTipo && matchesDate;
    });
  }, [
    inspecciones,
    searchTermActa,
    searchTermInspector,
    selectedTipo,
    dateRange,
  ]);

  // Obtener lista única de tipos de inspección para el Select
  const tiposDeInspeccionOptions = useMemo(() => {
    const tipos = inspecciones
      .map((i) => i.tipoInspeccion?.nombre)
      .filter(Boolean);
    return Array.from(new Set(tipos)).map((t) => ({ label: t, value: t }));
  }, [inspecciones]);

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
      title: "Solicitudes",
      key: "solicitudes",
      align: "center",
      render: (_, record) => {
        const count = record.solicitudesPendientes || 0;
        return (
          <Tooltip
            title={count > 0 ? `${count} pendiente(s)` : "Ver historial"}
          >
            <Button
              type="text"
              onClick={() => openSolicitudesModal(record.id_inspeccion)}
            >
              {count > 0 ? (
                <Badge count={count} style={{ backgroundColor: "#faad14" }}>
                  <EditOutlined style={{ fontSize: 18, color: "#faad14" }} />
                </Badge>
              ) : (
                <EditOutlined style={{ fontSize: 18, color: "#999" }} />
              )}
            </Button>
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
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              disabled={selectedRowKeys.length === 0}
              onClick={() =>
                downloadMassivePdf(selectedRowKeys as number[], printType)
              }
            >
              Descargar PDFs ({selectedRowKeys.length})
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Rango Fechas:</label>
            <RangePicker
              style={{ width: "100%" }}
              /* @ts-ignore */
              onChange={(val) => setDateRange(val)}
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
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <label style={{ fontWeight: 500 }}>Número Acta:</label>
            <Input
              placeholder="Buscar acta..."
              value={searchTermActa}
              onChange={(e) => setSearchTermActa(e.target.value)}
              allowClear
            />
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredInspecciones}
        rowKey="id_inspeccion"
        className="custom-table"
        scroll={{ x: 600 }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />

      {/* --- MODAL DE IMÁGENES --- */}
      <ModalImagenesInspeccion
        isModalOpen={isModalOpen}
        onClose={closeImageModal}
        currentInspeccionId={currentInspeccionId}
        tiposImagenes={tiposImagenes}
        isLoadingTipos={isLoadingTipos}
        getImagenPorTipo={getImagenPorTipo}
      />

      {/* --- MODAL DE SOLICITUDES DE EDICIÓN --- */}
      <Modal
        title="Solicitudes de Edición Pendientes"
        open={isSolicitudesModalOpen}
        onCancel={closeSolicitudesModal}
        footer={null}
        width={700}
      >
        {isLoadingSolicitudes ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin size="large" />
          </div>
        ) : solicitudes.length === 0 ? (
          <div style={{ textAlign: "center", padding: 20, color: "#999" }}>
            No hay solicitudes de edición para esta inspección.
          </div>
        ) : (
          <List
            itemLayout="vertical"
            dataSource={solicitudes}
            renderItem={(item) => (
              <List.Item
                key={item.id_solicitud}
                style={{
                  backgroundColor:
                    item.estado === "PENDIENTE" ? "#fffbe6" : "#f5f5f5",
                  marginBottom: 12,
                  padding: 16,
                  borderRadius: 8,
                  border:
                    item.estado === "PENDIENTE"
                      ? "1px solid #faad14"
                      : "1px solid #d9d9d9",
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <Tag
                    color={
                      item.estado === "PENDIENTE"
                        ? "warning"
                        : item.estado === "APROBADO"
                          ? "success"
                          : "error"
                    }
                  >
                    {item.estado}
                  </Tag>
                  <span style={{ color: "#999", fontSize: 12, marginLeft: 8 }}>
                    {new Date(item.fecha_solicitud).toLocaleString("es-CO")}
                  </span>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <strong>Observación del inspector:</strong>
                  <p style={{ margin: "4px 0", color: "#333" }}>
                    {item.observacion_inspector || "Sin observación"}
                  </p>
                </div>

                {item.observacion_ingeniero && (
                  <div style={{ marginBottom: 12 }}>
                    <strong>Respuesta del ingeniero:</strong>
                    <p style={{ margin: "4px 0", color: "#333" }}>
                      {item.observacion_ingeniero}
                    </p>
                  </div>
                )}

                {item.estado === "PENDIENTE" && (
                  <div>
                    <TextArea
                      placeholder="Observación del ingeniero (opcional)"
                      value={observacionIngeniero}
                      onChange={(e) => setObservacionIngeniero(e.target.value)}
                      rows={2}
                      style={{ marginBottom: 12 }}
                    />
                    <Space>
                      <Popconfirm
                        title="¿Aprobar esta solicitud?"
                        onConfirm={() =>
                          handleResponder(item.id_solicitud, "APROBADO")
                        }
                        okText="Sí, aprobar"
                        cancelText="Cancelar"
                      >
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          loading={isRespondiendo}
                        >
                          Aprobar
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="¿Rechazar esta solicitud?"
                        onConfirm={() =>
                          handleResponder(item.id_solicitud, "RECHAZADO")
                        }
                        okText="Sí, rechazar"
                        cancelText="Cancelar"
                      >
                        <Button
                          danger
                          icon={<CloseCircleOutlined />}
                          loading={isRespondiendo}
                        >
                          Rechazar
                        </Button>
                      </Popconfirm>
                    </Space>
                  </div>
                )}
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};
