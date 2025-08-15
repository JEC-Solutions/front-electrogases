import { Input, Select, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import { useTiposDocumentos } from "@/features/private/configuracion/tipos_documentos/hooks";

interface Props {
  methods: any;
  onFindDocument: (documento: string) => void;
}

export const StepCliente = ({ methods, onFindDocument }: Props) => {
  const { tipoDocumentos } = useTiposDocumentos();
  const {
    control,
    formState: { errors },
    trigger,
  } = methods;

  const formaDocuments = tipoDocumentos.map((documento) => ({
    value: documento.id_tipo_documento,
    label: documento.nombre,
  }));

  return (
    <Row gutter={16} className="mt-2">
      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="tipo_documento">Tipo de Documento</label>
          <Controller
            name="cliente.id_tipo_documento"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Select
                id="tipo_documento"
                showSearch
                allowClear
                placeholder="Seleccione el tipo de documento"
                style={{ width: "100%" }}
                optionFilterProp="label"
                options={formaDocuments}
                value={field.value ?? undefined}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors?.cliente?.id_tipo_documento && (
            <span style={{ color: "red" }}>
              {errors.cliente.id_tipo_documento.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="numero_documento">Número de documento</label>
          <Controller
            name="cliente.numero_documento"
            control={control}
            defaultValue={""}
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 10,
                message: "No puede tener más de 10 caracteres",
              },
              pattern: { value: /^\d+$/, message: "Solo dígitos" },
            }}
            render={({ field }) => (
              <Input
                id="numero_documento"
                placeholder="Número de documento"
                {...field}
                inputMode="numeric"
                pattern="\d*"
                onBlur={async (e) => {
                  field.onBlur();

                  const isValid = await trigger("cliente.numero_documento");
                  if (!isValid) return;

                  const doc = (e.target.value ?? "").toString().trim();
                  if (doc) onFindDocument(doc);
                }}
                onPressEnter={async (e) => {
                  const isValid = await trigger("cliente.numero_documento");
                  if (!isValid) return;
                  const doc = (e.currentTarget.value ?? "").toString().trim();
                  if (doc) onFindDocument(doc);
                }}
              />
            )}
          />
          {errors?.cliente?.numero_documento && (
            <span style={{ color: "red" }}>
              {errors.cliente.numero_documento.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={8}>
        <div className="mb-4">
          <label htmlFor="telefono">Teléfono</label>
          <Controller
            name="cliente.telefono"
            control={control}
            defaultValue={""}
            rules={{
              minLength: {
                value: 7,
                message: "Debe tener al menos 7 caracteres",
              },
              maxLength: {
                value: 10,
                message: "No puede tener más de 10 caracteres",
              },
            }}
            render={({ field }) => (
              <Input id="telefono" placeholder="Teléfono" {...field} />
            )}
          />
          {errors?.cliente?.telefono && (
            <span style={{ color: "red" }}>
              {errors.cliente.telefono.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="primer_nombre">Primer Nombre</label>
          <Controller
            name="cliente.primer_nombre"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue={""}
            render={({ field }) => (
              <Input
                id="primer_nombre"
                placeholder="Primer nombre"
                {...field}
              />
            )}
          />
          {errors?.cliente?.primer_nombre && (
            <span style={{ color: "red" }}>
              {errors.cliente.primer_nombre.message as string}
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
            defaultValue={""}
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
          <label htmlFor="primer_apellido">Primer Apellido</label>
          <Controller
            name="cliente.primer_apellido"
            control={control}
            defaultValue={""}
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
              {errors.cliente.primer_apellido.message as string}
            </span>
          )}
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div className="mb-4">
          <label htmlFor="segundo_apellido">Segundo Apellido</label>
          <Controller
            name="cliente.segundo_apellido"
            control={control}
            defaultValue={""}
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
    </Row>
  );
};
