import { Col, Input, InputNumber, Row, Select } from "antd";
import { Controller } from "react-hook-form";
import { ITipoVisita } from "@/features/private/inspeccion/rutas/interfaces";
import { useGlobalDptos } from "@/features/global/hooks";

interface Props {
  methods: any;
  tiposVisita: ITipoVisita[];
}

export const StepCasa = ({ methods, tiposVisita }: Props) => {
  const { ciudades, departamentos, getCityByDpto } = useGlobalDptos();
  const {
    control,
    formState: { errors },
  } = methods;

  const formatTipoVisita = tiposVisita.map((visita) => ({
    value: visita.id_tipo_visita,
    label: visita.nombre,
  }));

  const formatCiudades = ciudades.map((ciudad) => ({
    value: ciudad.codigo,
    label: ciudad.nombre,
  }));

  const formatDepartamentos = departamentos.map((dpto) => ({
    value: dpto.codigo,
    label: dpto.nombre,
  }));

  return (
    <Row gutter={16} className="mt-2">
      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="no_cuenta">Número de cuenta</label>
          <Controller
            name="casa.no_cuenta"
            control={control}
            defaultValue={''}
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 4,
                message: "Debe tener mínimo 4 caracteres",
              },
              maxLength: { value: 5, message: "Máximo 5 caracteres" },
            }}
            render={({ field }) => (
              <Input id="no_cuenta" placeholder="Número de cuenta" {...field} />
            )}
          />
          {errors?.casa?.no_cuenta && (
            <span style={{ color: "red" }}>
              {errors.casa.no_cuenta.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="medidor">Medidor</label>
          <Controller
            name="casa.medidor"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input id="medidor" placeholder="Medidor" {...field} />
            )}
          />
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="direccion">Dirección</label>
          <Controller
            name="casa.direccion"
            control={control}
            defaultValue={''}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Input id="direccion" placeholder="Dirección" {...field} />
            )}
          />
          {errors?.casa?.direccion && (
            <span style={{ color: "red" }}>
              {errors.casa.direccion.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="barrio">Barrio</label>
          <Controller
            name="casa.barrio"
            control={control}
            defaultValue={''}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Input id="barrio" placeholder="Barrio" {...field} />
            )}
          />
          {errors?.casa?.barrio && (
            <span style={{ color: "red" }}>
              {errors.casa.barrio.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="valor_servicio">Valor del servicio</label>
          <Controller
            name="casa.valor_servicio"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <InputNumber
                id="valor_servicio"
                style={{ width: "100%" }}
                placeholder="Valor del servicio"
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

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="numero_acta">Número de acta</label>
          <Controller
            name="casa.numero_acta"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input id="numero_acta" placeholder="Número de acta" {...field} />
            )}
          />
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="id_tipo_visita">Tipo de visita</label>
          <Controller
            name="casa.id_tipo_visita"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                id="id_tipo_visita"
                allowClear
                showSearch
                placeholder="Seleccione el tipo de visita"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatTipoVisita}
              />
            )}
          />
          {errors?.casa?.id_tipo_visita && (
            <span style={{ color: "red" }}>
              {errors.casa.id_tipo_visita.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="id_ciudad">Departamento</label>
          <Controller
            name="casa.id_departamento"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                id="id_departamento"
                allowClear
                showSearch
                placeholder="Seleccione el departamento"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatDepartamentos}
                onChange={(value) => {
                  field.onChange(value);
                  getCityByDpto(value);
                  methods.setValue("casa.id_ciudad", undefined, {
                    shouldValidate: true,
                  });
                }}
              />
            )}
          />
          {errors?.casa?.id_departamento && (
            <span style={{ color: "red" }}>
              {errors.casa.id_departamento.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label>Ciudad</label>
          <Controller
            name="casa.id_ciudad"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                showSearch
                placeholder="Seleccione la ciudad"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatCiudades}
                disabled={formatCiudades.length === 0}
              />
            )}
          />
          {errors?.casa?.id_ciudad && (
            <span style={{ color: "red" }}>
              {errors.casa.id_ciudad.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24}>
        <div className="mb-4">
          <label>Observaciones</label>
          <Controller
            name="casa.observaciones"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Input.TextArea rows={3} placeholder="Observaciones" {...field} />
            )}
          />
        </div>
      </Col>
    </Row>
  );
};
