import { Col, DatePicker, Input, Row, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { IResultados } from "@/features/private/inspeccion/rutas/interfaces";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";

interface Props {
  resultados: IResultados[];
  inspectores: IUsuarios[];
  methods: any;
}

export const StepRuta = ({ methods, resultados, inspectores }: Props) => {
  const {
    control,
    formState: { errors },
  } = methods;

  const formatResultados = resultados.map((resultado) => ({
    value: resultado.id_resultado,
    label: resultado.nombre,
  }));

  const formatInspectores =
    inspectores?.map((inspector) => ({
      value: inspector.id_usuario,
      label: `${inspector.persona?.primer_nombre ?? ""} ${
        inspector.persona?.primer_apellido ?? ""
      }`,
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
          <label>Resultado de la inspección</label>
          <Controller
            name="ruta.id_resultado"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                showSearch
                placeholder="Seleccione resultado"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatResultados}
              />
            )}
          />
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
          <label htmlFor="numero_acta">Número de acta</label>
          <Controller
            name="ruta.numero_acta"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Input id="numero_acta" placeholder="Número de acta" {...field} />
            )}
          />
        </div>
      </Col>
    </Row>
  );
};
