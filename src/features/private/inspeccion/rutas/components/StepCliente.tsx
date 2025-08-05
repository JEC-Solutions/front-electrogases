import { Input, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import { useTiposDocumentos } from "@/features/private/configuracion/tipos_documentos/hooks";

interface Props {
  methods: any;
}

export const StepCliente = ({ methods }: Props) => {
  const { tipoDocumentos } = useTiposDocumentos();
  const {
    control,
    formState: { errors },
  } = methods;

  const formatValues = tipoDocumentos.map((documento) => ({
    value: documento.id_tipo_documento,
    label: documento.nombre,
  }));

  return (
    <Row gutter={16} className="mt-2">
      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="primer_nombre">Primer Nombre</label>
          <Controller
            name="cliente.primer_nombre"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Input
                id="primero_nombre"
                placeholder="Primer nombre"
                {...field}
              />
            )}
          />
          {errors?.cliente?.primer_nombre && (
            <span style={{ color: "red" }}>
              {errors.cliente.primer_nombre.message}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="segundo_nombre">Segundo Nombre</label>
          <Controller
            name="cliente.segundo_nombre"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="segundo_nombre"
                placeholder="Segundo nombre"
                {...field}
              />
            )}
          />
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="primero_apellido">Primer Apellido</label>
          <Controller
            name="cliente.primer_apellido"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Input
                id="primer_apellido"
                placeholder="Primer apellido"
                {...field}
              />
            )}
          />
          {errors?.cliente?.primer_apellido && (
            <span style={{ color: "red" }}>
              {errors.cliente.primer_apellido.message}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="segundo_apellido">Segundo Apellido</label>
          <Controller
            name="cliente.segun_apellido"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="segundo_apellido"
                placeholder="Segundo apellido"
                {...field}
              />
            )}
          />
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="telefono">Teléfono</label>
          <Controller
            name="cliente.telefono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input id="telefono" placeholder="Telefono" {...field} />
            )}
          />
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="tipo_documento">Tipo de Documento</label>
          <Controller
            name="cliente.id_tipo_documento"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                id="tipo_documento"
                showSearch
                allowClear
                placeholder="Seleccione el tipo de documento"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formatValues}
                value={field.value ?? undefined}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            )}
          />
          {errors?.cliente?.id_tipo_documento && (
            <span style={{ color: "red" }}>
              {errors.cliente.id_tipo_documento.message}
            </span>
          )}
        </div>
      </Col>
    </Row>
  );
};
