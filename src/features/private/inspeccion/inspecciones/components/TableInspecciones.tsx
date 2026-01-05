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
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CameraOutlined,
  EyeOutlined,
  FilePdfOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ModalImagenesInspeccion } from "./ModalImagenesInspeccion";

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
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentInspeccionId(null);
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
        searchTermInspector.toLowerCase()
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
