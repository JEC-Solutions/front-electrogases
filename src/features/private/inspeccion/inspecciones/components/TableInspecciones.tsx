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
  Modal,
  Select,
  Spin,
  Empty,
  Image,
  Input,
  DatePicker,
  Row,
  Col,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CameraOutlined,
  EyeOutlined,
  FilePdfOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface Props {
  inspecciones: IInspecciones[];
  downloadPdf: (id: number) => void;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number
  ) => Promise<any>;
  tiposImagenes: ITipoImagen[];
  isLoadingTipos: boolean;
}

export const TableInspecciones = ({
  inspecciones,
  downloadPdf,
  getImagenPorTipo,
  tiposImagenes,
  isLoadingTipos,
}: Props) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInspeccionId, setCurrentInspeccionId] = useState<number | null>(
    null
  );
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [imageList, setImageList] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // --- Estados para los filtros ---
  const [searchTermActa, setSearchTermActa] = useState("");
  const [searchTermInspector, setSearchTermInspector] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const handleRedirect = (id: number) => {
    navigate(`/dashboard/inspecciones/${id}`);
  };

  const openImageModal = (id: number) => {
    setCurrentInspeccionId(id);
    setSelectedTypeId(null);
    setImageList([]);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentInspeccionId(null);
  };

  const handleTypeChange = async (tipoId: number) => {
    if (!currentInspeccionId) return;

    setSelectedTypeId(tipoId);
    setLoadingImages(true);
    setImageList([]);

    try {
      const res = await getImagenPorTipo(currentInspeccionId, tipoId);

      const responseData = res?.data?.imagenes || [];

      const imagesArray = Array.isArray(responseData)
        ? responseData
        : responseData
        ? [responseData]
        : [];

      const validImages = imagesArray.filter(
        (img: any) => img && img.imagenBase64
      );

      setImageList(validImages);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar conectar con el servidor.",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoadingImages(false);
    }
  };

  // --- Lógica de filtrado ---
  const filteredInspecciones = useMemo(() => {
    return inspecciones.filter((item) => {
      // 1. Filtro por Número de Acta
      const acta = item.ruta?.numero_acta || "";
      const matchesActa = acta
        .toLowerCase()
        .includes(searchTermActa.toLowerCase());

      // 2. Filtro por Inspector (nombre completo)
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
        searchTermInspector.toLowerCase()
      );

      // 3. Filtro por Tipo de Inspección
      // Asumimos que item.tipoInspeccion.nombre existe
      const matchesTipo = selectedTipo
        ? item.tipoInspeccion?.nombre === selectedTipo
        : true;

      // 4. Filtro por Fechas (Rango)
      let matchesDate = true;
      if (dateRange && dateRange[0] && dateRange[1]) {
        const fechaInsp = dayjs(item.fecha_inspeccion);
        // isBetween(start, end, unit, inclusivity): [] -> inclusivity '[]' incluye start y end
        matchesDate = fechaInsp.isBetween(
          dateRange[0],
          dateRange[1],
          "day",
          "[]"
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
      />

      {/* --- MODAL DE IMÁGENES --- */}
      <Modal
        title="Visualizador de Imágenes"
        open={isModalOpen}
        onCancel={closeImageModal}
        footer={[
          <Button key="close" onClick={closeImageModal}>
            Cerrar
          </Button>,
        ]}
        width={700}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* 1. SELECCIONADOR DE TIPO */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Seleccione el tipo de imagen a visualizar:
            </label>
            <Select
              style={{ width: "100%" }}
              placeholder="Ej: Foto Fachada, Firma..."
              loading={isLoadingTipos}
              onChange={handleTypeChange}
              value={selectedTypeId}
              options={tiposImagenes.map((tipo) => ({
                label: `${tipo.descripcion}`,
                value: tipo.id,
              }))}
            />
          </div>

          {/* 2. ÁREA DE VISUALIZACIÓN */}
          <div
            style={{
              minHeight: "300px",
              border: "1px dashed #d9d9d9",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fafafa",
              padding: "20px",
            }}
          >
            {loadingImages ? (
              <Spin tip="Cargando imagen..." size="large" />
            ) : !selectedTypeId ? (
              <Empty description="Seleccione un tipo de imagen arriba" />
            ) : imageList.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {imageList.map((imgItem, idx) => {
                  const rawBase64 = imgItem.imagenBase64;
                  const src = rawBase64?.startsWith("data:image")
                    ? rawBase64
                    : `data:image/png;base64,${rawBase64}`;

                  return (
                    <Image
                      key={idx}
                      width={200}
                      src={src}
                      alt="Evidencia"
                      style={{ objectFit: "contain", maxHeight: "300px" }}
                    />
                  );
                })}
              </div>
            ) : (
              <Empty description="No hay imágenes para este tipo" />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
