import {
  IAsignar,
  IRutas,
  IPdfRuta,
} from "@/features/private/inspeccion/rutas/interfaces";
import {
  Button,
  DatePicker,
  Input,
  Popover,
  Row,
  Col,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  FiClock,
  FiEdit2,
  FiFileText,
  FiLock,
  FiNavigation,
  FiSearch,
  FiUnlock,
} from "react-icons/fi";
import { getRedOutlineButtonProps } from "@/ui";
import { ModalAsignar } from "@/features/private/inspeccion/rutas/components";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { useHistorialRuta } from "@/features/private/inspeccion/rutas/hooks";
import { ModalHistorico } from "@/features/private/inspeccion/rutas/components";
import { useClientes } from "@/features/private/inspeccion/clientes/hooks";
import dayjs, { Dayjs } from "dayjs";
import Swal from "sweetalert2";
import { RutasFilters } from "../services/rutas.services";

type LocalFilters = {
  start: Dayjs | null;
  end: Dayjs | null;
  inspectorId?: number;
  asesorId?: number;
  clienteId?: number;
  clienteDocumento?: string;
  estado_inspeccion?: string;
};

interface Props {
  rutas: IRutas[];
  open: boolean;
  current: IRutas;
  onOpen: (payload: IRutas) => void;
  onClose: () => void;
  onSubmit: (payload: IAsignar) => void;
  methods: any;
  inspectores: IUsuarios[];
  asesores: IUsuarios[];
  onDownload: (payload: IPdfRuta) => void;
  onUpdateDate: (id: number, fecha: string, motivo?: string) => void;

  // Pagination & Filters
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: RutasFilters) => void;
  isLoading?: boolean;
  onToggleStatus: (id: number, currentEstado: boolean) => void;
}

export const TableRutas = ({
  rutas,
  current,
  open,
  onClose,
  onOpen,
  methods,
  onSubmit,
  inspectores,
  asesores,
  onDownload,
  onUpdateDate,
  pagination,
  setPage,
  setLimit,
  setFilters,
  isLoading,
  onToggleStatus,
}: Props) => {
  const {
    handleViewHistorial,
    handleCloseHistorial,
    openHistorial,
    historial,
    errorHistorial,
    historialError,
    loadingHistorial,
    refetchHistorial,
  } = useHistorialRuta();

  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    start: null,
    end: null,
    inspectorId: undefined,
    clienteId: undefined,
    asesorId: undefined,
    clienteDocumento: "",
    estado_inspeccion: undefined,
  });

  const { clientes } = useClientes();

  // State for popover logic
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState<Dayjs | null>(null);
  const [editMotivo, setEditMotivo] = useState("");

  const handleEditClick = (record: IRutas) => {
    setEditingId(record.id_ruta);
    setEditDate(record.fecha ? dayjs(record.fecha) : null);
    setEditMotivo("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditDate(null);
    setEditMotivo("");
  };

  const handleSaveEdit = (id: number) => {
    if (!editDate) {
      Swal.fire("Error", "Debes seleccionar una fecha", "error");
      return;
    }
    const fechaStr = editDate.format("YYYY-MM-DD");
    onUpdateDate(id, fechaStr, editMotivo);
    handleCancelEdit();
  };

  const columns: ColumnsType<IRutas> = [
    {
      title: "N° Acta",
      key: "numero_acta",
      render: (_, record) => {
        const id = Number(record?.tipo_visita?.id_tipo_visita);
        const numeroActa = record?.numero_acta || "";
        let prefijo = record?.tipo_visita?.id_tipo_visita || "";

        if (id === 1) prefijo = "PD";
        if (id === 2) prefijo = "NRD";

        return `${prefijo} ${numeroActa}`.trim();
      },
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (val, record) => {
        const isOpen = editingId === record.id_ruta;
        return (
          <div className="flex items-center gap-2">
            <span>{val}</span>
            <Popover
              content={
                <div className="flex flex-col gap-2 p-2 w-[250px]">
                  <span className="font-bold">Nueva fecha:</span>
                  <DatePicker
                    value={editDate}
                    onChange={(d) => setEditDate(d)}
                    format="YYYY-MM-DD"
                  />
                  <Input
                    placeholder="Motivo (opcional)"
                    value={editMotivo}
                    onChange={(e) => setEditMotivo(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button size="small" onClick={handleCancelEdit}>
                      Cancelar
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleSaveEdit(record.id_ruta)}
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              }
              title="Editar Fecha"
              trigger="click"
              open={isOpen}
              onOpenChange={(visible) => {
                if (!visible) handleCancelEdit();
              }}
            >
              <Button
                size="small"
                type="text"
                icon={<FiEdit2 />}
                onClick={() => handleEditClick(record)}
              />
            </Popover>
          </div>
        );
      },
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
      title: "Asesor",
      key: "asesor",
      render: (_: unknown, record) => {
        const p = record.asesor;
        return p ? `${p.primer_nombre} ${p.primer_apellido}` : "—";
      },
    },
    {
      title: "Dirección",
      key: "direccion",
      dataIndex: ["casa", "direccion"],
      width: 200,
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
      width: 150,
    },
    {
      title: "Estado de la Ruta",
      key: "estado",
      render: (_: unknown, record: IRutas) => {
        const status = record.estado;
        const color = status ? "blue" : "red";
        return (
          <Tag color={color} className="uppercase">
            {status ? "Activa" : "Inactiva"}
          </Tag>
        );
      },
      width: 120,
    },
    {
      title: "Estado del Acta",
      key: "estado_inspeccion",
      render: (_: unknown, record: IRutas) => {
        const status = record.estado_inspeccion || "PENDIENTE";
        const color = status === "REALIZADO" ? "green" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
      width: 120,
    },
    {
      title: "Acciones",
      key: "acciones",
      fixed: "right",
      width: 120,
      render: (_: unknown, record) => (
        <Space>
          <Tooltip title="Ver historial de asignaciones">
            <Button
              size="small"
              icon={<FiClock size={16} />}
              onClick={() => handleViewHistorial?.(record)}
            />
          </Tooltip>
          <Tooltip
            title={
              record.persona?.id_persona ? "Reasignar ruta" : "Asignar ruta"
            }
          >
            <Button
              type="primary"
              size="small"
              icon={<FiNavigation size={16} />}
              onClick={() => onOpen(record)}
            />
          </Tooltip>
          <Tooltip title={record.estado ? "Inactivar ruta" : "Activar ruta"}>
            <Button
              size="small"
              danger={record.estado}
              icon={
                record.estado ? (
                  <FiUnlock size={16} />
                ) : (
                  <FiLock size={16} />
                )
              }
              onClick={() => onToggleStatus(record.id_ruta, record.estado)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = () => {
    const {
      start,
      end,
      inspectorId,
      asesorId,
      clienteId,
      clienteDocumento,
      estado_inspeccion,
    } = localFilters;

    const filters: RutasFilters = {
      startDate: start ? start.format("YYYY-MM-DD") : undefined,
      endDate: end ? end.format("YYYY-MM-DD") : undefined,
      inspectorId,
      asesorId,
      clienteId,
      clienteDocumento: clienteDocumento?.trim() || undefined,
      estado_inspeccion,
    };
    setFilters(filters);
    setPage(1);
  };

  const handleExportPdf = () => {
    const {
      start,
      end,
      inspectorId,
      asesorId,
      clienteId,
      clienteDocumento,
      estado_inspeccion,
    } = localFilters;

    if (!start || !end) {
      Swal.fire({
        icon: "warning",
        title: "Falta rango de fechas",
        text: "Selecciona la fecha de inicio y fin para generar el PDF.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (end.isBefore(start, "day")) {
      Swal.fire({
        icon: "error",
        title: "Rango inválido",
        text: "La fecha final no puede ser anterior a la fecha inicial.",
        confirmButtonText: "Corregir",
      });
      return;
    }

    onDownload({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
      inspectorId: inspectorId ?? 0,
      clienteId: clienteId ?? 0,
      asesorId: asesorId ?? 0,
      clienteDocumento: (clienteDocumento || "").trim(),
      estado_inspeccion,
    });
  };

  const normalize = (s: string) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  return (
    <>
      <div className="overflow-x-auto">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div className="mb-6 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
            <Row gutter={[12, 12]} align="bottom">
              <Col xs={12} sm={8} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">
                    Inicio
                  </span>
                  <DatePicker
                    className="w-full"
                    format="YYYY-MM-DD"
                    value={localFilters.start}
                    onChange={(val) =>
                      setLocalFilters((s) => ({
                        ...s,
                        start: val,
                      }))
                    }
                  />
                </div>
              </Col>

              <Col xs={12} sm={8} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">Fin</span>
                  <DatePicker
                    className="w-full"
                    format="YYYY-MM-DD"
                    value={localFilters.end}
                    onChange={(val) =>
                      setLocalFilters((s) => ({
                        ...s,
                        end: val,
                      }))
                    }
                  />
                </div>
              </Col>

              <Col xs={24} sm={8} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">
                    Inspector
                  </span>
                  <Select
                    allowClear
                    showSearch={{
                      filterOption: (input, option) =>
                        normalize(option?.label as string).includes(
                          normalize(input),
                        ),
                      optionFilterProp: "label",
                    }}
                    placeholder="Seleccionar..."
                    className="w-full"
                    options={inspectores.map((i) => ({
                      value: i.persona?.id_persona,
                      label: `${i.persona?.primer_nombre ?? ""} ${
                        i.persona?.primer_apellido ?? ""
                      }`.trim(),
                    }))}
                    value={localFilters.inspectorId}
                    onChange={(v) =>
                      setLocalFilters((s) => ({ ...s, inspectorId: v }))
                    }
                  />
                </div>
              </Col>

              <Col xs={24} sm={8} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">
                    Asesor
                  </span>
                  <Select
                    allowClear
                    showSearch={{
                      filterOption: (input, option) =>
                        normalize(option?.label as string).includes(
                          normalize(input),
                        ),
                      optionFilterProp: "label",
                    }}
                    placeholder="Seleccionar..."
                    className="w-full"
                    options={asesores.map((i) => ({
                      value: i.persona?.id_persona,
                      label: `${i.persona?.primer_nombre ?? ""} ${
                        i.persona?.primer_apellido ?? ""
                      }`.trim(),
                    }))}
                    value={localFilters.asesorId}
                    onChange={(v) =>
                      setLocalFilters((s) => ({ ...s, asesorId: v }))
                    }
                  />
                </div>
              </Col>

              <Col xs={24} sm={8} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">
                    Cliente
                  </span>
                  <Select
                    allowClear
                    showSearch={{
                      filterOption: (input, option) =>
                        normalize(option?.label as string).includes(
                          normalize(input),
                        ),
                      optionFilterProp: "label",
                    }}
                    placeholder="Seleccionar..."
                    className="w-full"
                    options={clientes.map((c) => ({
                      value: c.id_cliente,
                      label: `${c.primer_nombre ?? ""} ${
                        c.primer_apellido ?? ""
                      }`.trim(),
                    }))}
                    value={localFilters.clienteId}
                    onChange={(v) =>
                      setLocalFilters((s) => ({ ...s, clienteId: v }))
                    }
                  />
                </div>
              </Col>

              <Col xs={24} sm={12} md={6} lg={3}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500">
                    Estado del Acta
                  </span>
                  <Select
                    allowClear
                    placeholder="Seleccionar..."
                    className="w-full"
                    options={[
                      { value: "PENDIENTE", label: "PENDIENTE" },
                      { value: "REALIZADO", label: "REALIZADO" },
                    ]}
                    value={localFilters.estado_inspeccion}
                    onChange={(v) =>
                      setLocalFilters((s) => ({ ...s, estado_inspeccion: v }))
                    }
                  />
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={4}>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    type="primary"
                    icon={<FiSearch size={16} />}
                    onClick={handleSearch}
                  >
                    Buscar
                  </Button>
                  <Button
                    className="flex-1"
                    icon={<FiFileText size={16} />}
                    {...getRedOutlineButtonProps()}
                    onClick={handleExportPdf}
                    disabled={!localFilters.start || !localFilters.end}
                  >
                    PDF
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          <Table
            columns={columns}
            dataSource={rutas}
            rowKey="id_ruta"
            className="custom-table"
            rowClassName={(_record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
            scroll={{ x: 1200 }}
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} de ${total} rutas`,
              onChange: (p, l) => {
                setPage(p);
                setLimit(l);
              },
            }}
          />
        </Space>
      </div>

      <ModalAsignar
        open={open}
        onClose={onClose}
        current={current}
        methods={methods}
        onSubmit={onSubmit}
        inspectores={inspectores}
      />

      <ModalHistorico
        onClose={handleCloseHistorial}
        open={openHistorial}
        historial={historial}
        isError={errorHistorial}
        error={historialError}
        loading={loadingHistorial}
        refetch={refetchHistorial}
      />
    </>
  );
};
