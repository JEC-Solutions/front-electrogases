import {
  IAsignar,
  IRutas,
  IPdfRuta,
} from "@/features/private/inspeccion/rutas/interfaces";
import { Button, DatePicker, Input, Select, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { FiClock, FiFileText, FiNavigation } from "react-icons/fi";
import { getRedOutlineButtonProps } from "@/ui";
import { ModalAsignar } from "@/features/private/inspeccion/rutas/components";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { useHistorialRuta } from "@/features/private/inspeccion/rutas/hooks";
import { ModalHistorico } from "@/features/private/inspeccion/rutas/components";
import { useClientes } from "@/features/private/inspeccion/clientes/hooks";
import { Dayjs } from "dayjs";
import Swal from "sweetalert2";

type PdfFilters = {
  start: Dayjs | null;
  end: Dayjs | null;
  inspectorId?: number;
  clienteId?: number;
  clienteDocumento?: string;
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
  onDownload: (payload: IPdfRuta) => void;
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
  onDownload,
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
  const [pdfFilters, setPdfFilters] = useState<PdfFilters>({
    start: null,
    end: null,
    inspectorId: undefined,
    clienteId: undefined,
    clienteDocumento: "",
  });
  const { clientes } = useClientes();
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
        </Space>
      ),
    },
  ];

  const handleExportPdf = () => {
    const { start, end, inspectorId, clienteId, clienteDocumento } = pdfFilters;

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
      clienteDocumento: (clienteDocumento || "").trim(),
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
          <Space wrap>
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              value={[pdfFilters.start, pdfFilters.end]}
              onChange={(vals) =>
                setPdfFilters((s) => ({
                  ...s,
                  start: vals?.[0] ?? null,
                  end: vals?.[1] ?? null,
                }))
              }
            />

            <Select
              allowClear
              showSearch
              placeholder="Inspector"
              style={{ width: 220 }}
              options={inspectores.map((i) => ({
                value: i.id_usuario,
                label: `${i.persona?.primer_nombre ?? ""} ${
                  i.persona?.primer_apellido ?? ""
                }`.trim(),
              }))}
              optionFilterProp="label"
              filterOption={(input, option) =>
                normalize(option?.label as string).includes(normalize(input))
              }
              value={pdfFilters.inspectorId}
              onChange={(v) => setPdfFilters((s) => ({ ...s, inspectorId: v }))}
            />

            <Select
              allowClear
              showSearch
              placeholder="Cliente"
              style={{ width: 220 }}
              options={clientes.map((c) => ({
                value: c.id_cliente,
                label: `${c.primer_nombre ?? ""} ${
                  c.primer_apellido ?? ""
                }`.trim(),
              }))}
              optionFilterProp="label"
              filterOption={(input, option) =>
                normalize(option?.label as string).includes(normalize(input))
              }
              value={pdfFilters.clienteId}
              onChange={(v) => setPdfFilters((s) => ({ ...s, clienteId: v }))}
            />

            <Input
              placeholder="Documento cliente"
              allowClear
              style={{ width: 200 }}
              value={pdfFilters.clienteDocumento}
              onChange={(e) =>
                setPdfFilters((s) => ({
                  ...s,
                  clienteDocumento: e.target.value,
                }))
              }
            />

            <Button
              icon={<FiFileText size={18} />}
              {...getRedOutlineButtonProps()}
              onClick={handleExportPdf}
              disabled={!pdfFilters.start || !pdfFilters.end}
            >
              Exportar PDF
            </Button>
          </Space>

          <Table
            columns={columns}
            dataSource={rutas}
            rowKey="id_ruta"
            className="custom-table"
            rowClassName={(_record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
            scroll={{ x: 600 }}
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
