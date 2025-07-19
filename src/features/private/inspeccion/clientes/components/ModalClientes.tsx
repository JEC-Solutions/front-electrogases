import { ITipoDocumentos } from "@/features/private/configuracion/tipos_documentos/interfaces";
import { ICliente, IClientes } from "@/features/private/inspeccion/clientes/interfaces";
import { Button, Input, Modal, Select, Space, Row, Col } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: ICliente) => void;
  currentCliente: IClientes | null;
  documentos: ITipoDocumentos[];
}

export const ModalClientes = ({
  open,
  onClose,
  methods,
  onSubmit,
  currentCliente,
  documentos,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentCliente ? "Editar Cliente" : "Agregar Cliente"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="id_tipo_documento">Tipo de Documento</label>
              <Controller
                name="id_tipo_documento"
                control={control}
                defaultValue=""
                rules={{
                  required: "Por favor seleccione un tipo de documento",
                }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="id_tipo_documento"
                      showSearch
                      allowClear
                      placeholder="Seleccione un tipo de documento"
                      style={{ width: "100%" }}
                      optionFilterProp="label"
                      options={documentos.map((d) => ({
                        label: d.nombre,
                        value: d.id_tipo_documento,
                      }))}
                      onChange={(value) => field.onChange(value ?? "")}
                      value={field.value ?? undefined}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                    {errors.id_tipo_documento?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.id_tipo_documento.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="numero_documento">Número de Documento</label>
              <Controller
                name="numero_documento"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el número de documento" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="numero_documento"
                      placeholder="Número de Documento"
                    />

                    {errors.numero_documento?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.numero_documento.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="primer_nombre">Primer Nombre</label>
              <Controller
                name="primer_nombre"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer nombre" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="primer_nombre"
                      placeholder="Primer Nombre"
                    />

                    {errors.primer_nombre?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.primer_nombre.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="segundo_nombre">Segundo Nombre</label>
              <Controller
                name="segundo_nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="segundo_nombre"
                      placeholder="Segundo Nombre"
                    />
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="primer_apellido">Primer Apellido</label>
              <Controller
                name="primer_apellido"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer apellido" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="primer_apellido"
                      placeholder="Primer Apellido"
                    />

                    {errors.primer_apellido?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.primer_apellido.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="segundo_apellido">Segundo Apellido</label>
              <Controller
                name="segundo_apellido"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="segundo_apellido"
                      placeholder="Segundo Apellido"
                    />
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="telefono">Telefono</label>
              <Controller
                name="telefono"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input {...field} id="telefono" placeholder="Telefono" />
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="default"
            onClick={() => {
              onClose();
              methods.reset();
            }}
          >
            Cancelar
          </Button>

          <Button type="primary" htmlType="submit">
            {currentCliente ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
