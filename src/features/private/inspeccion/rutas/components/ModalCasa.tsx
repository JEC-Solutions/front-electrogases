import {
  ICasa,
  Ciudad,
  Cliente,
} from "@/features/private/inspeccion/rutas/interfaces";
import { Button, Input, Modal, Select, Space, Row, Col } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: ICasa) => void;
  ciudades: Ciudad[];
  clientes: Cliente[];
  onOpenCliente: () => void;
}

export const ModalCasa = ({
  methods,
  onClose,
  onSubmit,
  open,
  ciudades,
  clientes,
  onOpenCliente,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title="Registrar Nueva Casa"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="medidor">Número de Medidor</label>
              <Controller
                name="medidor"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el número de medidor" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="medidor" placeholder="Número de medidor" />
                    {errors.medidor?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.medidor.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="telefono">Teléfono</label>
              <Controller
                name="telefono"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el teléfono" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="telefono" placeholder="Teléfono de contacto" />
                    {errors.telefono?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.telefono.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <label htmlFor="direccion">Dirección</label>
          <Controller
            name="direccion"
            control={control}
            defaultValue=""
            rules={{ required: "Por favor ingrese la dirección" }}
            render={({ field }) => (
              <>
                <Input {...field} id="direccion" placeholder="Dirección completa" />
                {errors.direccion?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.direccion.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="barrio">Barrio</label>
              <Controller
                name="barrio"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el barrio" }}
                render={({ field }) => (
                  <>
                    <Input {...field} id="barrio" placeholder="Nombre del barrio" />
                    {errors.barrio?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.barrio.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="codigo_ciudad">Ciudad</label>
              <Controller
                name="codigo_ciudad"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor seleccione la ciudad" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="codigo_ciudad"
                      style={{ width: "100%" }}
                      placeholder="Seleccione la ciudad"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      options={ciudades.map((ciudad) => ({
                        value: ciudad.codigo,
                        label: `${ciudad.nombre} - ${ciudad.departamento.nombre}`,
                      }))}
                    />
                    {errors.codigo_ciudad?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.codigo_ciudad.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <label htmlFor="id_cliente">Cliente Propietario/Encargado</label>
          <Controller
            name="id_cliente"
            control={control}
            defaultValue=""
            rules={{ required: "Por favor seleccione el cliente" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  id="id_cliente"
                  style={{ width: "100%" }}
                  placeholder="Seleccione el cliente"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  options={clientes.map((cliente) => ({
                    value: cliente.id_cliente,
                    label: `${cliente.primer_nombre} ${cliente.primer_apellido} - ${cliente.numero_documento}`,
                  }))}
                />
                {errors.id_cliente?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.id_cliente.message)}
                  </span>
                )}
              </>
            )}
          />
          <div className="mt-2">
            <Button type="dashed" onClick={onOpenCliente}>
              + Registrar Nuevo Cliente
            </Button>
          </div>
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
            Registrar Casa
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
