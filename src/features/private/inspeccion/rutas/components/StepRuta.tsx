import { Col, DatePicker, Row, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { IResultados } from "@/features/private/inspeccion/rutas/interfaces";

interface Props {
  resultados: IResultados[];
  methods: any;
}

export const StepRuta = ({ methods, resultados }: Props) => {
  const {
    control,
    formState: { errors },
  } = methods;

  const formatResultados = resultados.map((resultado) => ({
    value: resultado.id_resultado,
    label: resultado.nombre,
  }));

  return (
    <Row gutter={16} className="mt-2">
      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Fecha</label>
          <Controller
            name="ruta.fecha"
            control={control}
            defaultValue={''}
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
            defaultValue={''}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <TimePicker
                format="HH:mm:ss"
                value={field.value ? dayjs(field.value, "HH:mm:ss") : null}
                onChange={(_, timeStr) => field.onChange(timeStr || "")}
                style={{ width: "100%" }}
              />
            )}
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
    </Row>
  );
};
