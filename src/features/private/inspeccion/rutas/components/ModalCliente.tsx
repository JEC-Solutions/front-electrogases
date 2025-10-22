import {
  ICliente,
  TipoDocumento,
} from "@/features/private/inspeccion/rutas/interfaces";
import { Button, Input, Modal, Select, Space, Row, Col } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: ICliente) => void;
  tiposDocumento: TipoDocumento[];
}

export const ModalCliente = ({
  methods,
  onClose,
  onSubmit,
  open,
  tiposDocumento,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title="Registrar Nuevo Cliente"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="id_tipo_documento">Tipo de Documento</label>
              <Controller
                name="id_tipo_documento"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor seleccione el tipo de documento" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="id_tipo_documento"
                      style={{ width: "100%" }}
                      placeholder="Seleccione el tipo de documento"
                      options={tiposDocumento.map((tipo) => ({
                        value: tipo.id_tipo_documento,
                        label: `${tipo.nombre} (${tipo.abreviacion})`,
                      }))}
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

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="numero_documento">Número de Documento</label>
              <Controller
                name="numero_documento"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el número de documento" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="numero_documento" placeholder="Número de documento" />
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
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="primer_nombre">Primer Nombre</label>
              <Controller
                name="primer_nombre"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer nombre" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="primer_nombre" placeholder="Primer nombre" />
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

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="segundo_nombre">Segundo Nombre</label>
              <Controller
                name="segundo_nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input {...field} id="segundo_nombre" placeholder="Segundo nombre (opcional)" />
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="primer_apellido">Primer Apellido</label>
              <Controller
                name="primer_apellido"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer apellido" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="primer_apellido" placeholder="Primer apellido" />
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

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="segundo_apellido">Segundo Apellido</label>
              <Controller
                name="segundo_apellido"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input {...field} id="segundo_apellido" placeholder="Segundo apellido (opcional)" />
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <label htmlFor="telefono">Teléfono/Celular</label>
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            rules={{ required: "Por favor ingrese el teléfono" }}
            render={({ field }) => (
              <>
                <Input {...field} id="telefono" placeholder="Número de teléfono o celular" />
                {errors.telefono?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.telefono.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

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
            Registrar Cliente
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
