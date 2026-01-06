import {
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { ITipoVisita } from "@/features/private/inspeccion/rutas/interfaces";

interface Props {
  inspectores: IUsuarios[];
  tiposVisita: ITipoVisita[];
  methods: any;
}

export const StepRuta = ({ methods, inspectores, tiposVisita }: Props) => {
  const {
    control,
    formState: { errors },
  } = methods;

  const formatInspectores =
    inspectores?.map((inspector) => ({
      value: inspector.id_usuario,
      label: `${inspector.persona?.primer_nombre ?? ""} ${
        inspector.persona?.primer_apellido ?? ""
      }`,
    })) ?? [];

  const formatTipoVisita =
    tiposVisita?.map((visita) => ({
      value: visita.id_tipo_visita,
      label: visita.nombre,
    })) ?? [];

  return (
    <Row gutter={16} className="mt-2">
      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Fecha</label>
          <Controller
            name="ruta.fecha"
            control={control}
            defaultValue={""}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <DatePicker
                format="YYYY-MM-DD"
                value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                onChange={(_, dateStr) => field.onChange(dateStr || "")}
                style={{ width: "100%" }}
              />
            )}
          />
          {errors?.ruta?.fecha && (
            <span style={{ color: "red" }}>
              {errors.ruta.fecha.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Hora</label>
          <Controller
            name="ruta.hora"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => {
              const fmt = field.value?.length === 5 ? "HH:mm" : "HH:mm:ss";
              return (
                <TimePicker
                  format="HH:mm"
                  value={field.value ? dayjs(field.value, fmt) : null}
                  onChange={(_, timeStr) => field.onChange(timeStr || "")}
                  style={{ width: "100%" }}
                />
              );
            }}
          />
          {errors?.ruta?.hora && (
            <span style={{ color: "red" }}>
              {errors.ruta.hora.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Inspector asignado</label>
          <Controller
            name="ruta.id_inspector"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                showSearch
                placeholder="Seleccione inspector (opcional)"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatInspectores}
                value={field.value ?? null}
                onChange={(v) => field.onChange(v ?? null)}
              />
            )}
          />
          {errors?.ruta?.id_inspector && (
            <span style={{ color: "red" }}>
              {errors.ruta.id_inspector.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Tipo de visita</label>
          <Controller
            name="ruta.id_tipo_visita"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                showSearch
                placeholder="Seleccione tipo de visita (opcional)"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatTipoVisita}
                value={field.value ?? null}
                onChange={(v) => field.onChange(v ?? null)}
              />
            )}
          />
          {errors?.ruta?.id_tipo_visita && (
            <span style={{ color: "red" }}>
              {errors.ruta.id_tipo_visita.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Valor del servicio</label>
          <Controller
            name="ruta.valor_servicio"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Valor del servicio (opcional)"
                min={0}
                precision={0}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                formatter={(value) =>
                  value === undefined || value === null
                    ? ""
                    : new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      }).format(Number(value))
                }
                parser={(value) => {
                  const onlyDigits = value?.toString().replace(/[^\d]/g, "");
                  return onlyDigits ? Number(onlyDigits) : undefined;
                }}
              />
            )}
          />
        </div>
      </Col>

      <Col xs={24}>
        <div className="mb-4">
          <label>Observaciones</label>
          <Controller
            name="ruta.observaciones"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Input.TextArea
                rows={3}
                placeholder="Observaciones (opcional)"
                {...field}
              />
            )}
          />
        </div>
      </Col>
    </Row>
  );
};
