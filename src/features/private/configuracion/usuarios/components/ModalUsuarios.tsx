import { ITipoDocumentos } from "@/features/private/configuracion/tipos_documentos/interfaces";
import {
  IUsuarios,
  IUsuario,
} from "@/features/private/configuracion/usuarios/interfaces";
import { Button, Input, Modal, Select, Space, Row, Col } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IUsuario) => void;
  currentUsuario: IUsuarios | null;
  documentos: ITipoDocumentos[];
}

export const ModalUsuarios = ({
  open,
  onClose,
  methods,
  onSubmit,
  currentUsuario,
  documentos,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentUsuario ? "Editar Usuario" : "Agregar Usuario"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.id_tipo_documento">
                Tipo de Documento
              </label>
              <Controller
                name="persona.id_tipo_documento"
                control={control}
                defaultValue=""
                rules={{
                  required: "Por favor seleccione un tipo de documento",
                }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="persona.id_tipo_documento"
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
                    {errors.persona?.id_tipo_documento?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.persona?.id_tipo_documento.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.numero_documento">
                Número de Documento
              </label>
              <Controller
                name="persona.numero_documento"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el número de documento" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.numero_documento"
                      placeholder="Número de Documento"
                      type="text"
                    />

                    {errors.persona?.numero_documento?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.persona?.numero_documento.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.primer_nombre">Primer Nombre</label>
              <Controller
                name="persona.primer_nombre"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer nombre" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.primer_nombre"
                      placeholder="Primer Nombre"
                      type="text"
                    />

                    {errors.persona?.primer_nombre?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.persona?.primer_nombre.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.segundo_nombre">Segundo Nombre</label>
              <Controller
                name="persona.segundo_nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.segundo_nombre"
                      placeholder="Segundo Nombre"
                      type="text"
                    />
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.primer_apellido">Primer Apellido</label>
              <Controller
                name="persona.primer_apellido"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el primer apellido" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.primer_apellido"
                      placeholder="Primer Apellido"
                      type="text"
                    />

                    {errors.persona?.primer_apellido?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.persona?.primer_apellido.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.segundo_apellido">Segundo Apellido</label>
              <Controller
                name="persona.segundo_apellido"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="segundo_apellido"
                      placeholder="Segundo Apellido"
                      type="text"
                    />
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.telefono">Telefono</label>
              <Controller
                name="persona.telefono"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.telefono"
                      placeholder="Telefono"
                      type="text"
                    />
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="persona.email">Email</label>
              <Controller
                name="persona.email"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el email" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="persona.email"
                      placeholder="Email"
                      type="email"
                    />

                    {errors.persona?.email?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.persona?.email.message)}
                      </span>
                    )}
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
            {currentUsuario ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
