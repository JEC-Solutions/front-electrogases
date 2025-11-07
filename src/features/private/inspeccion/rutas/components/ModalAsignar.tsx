import { Button, Col, Input, Modal, Row, Select, Space } from "antd";
import {
  IAsignar,
  IRutas,
} from "@/features/private/inspeccion/rutas/interfaces";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  current: IRutas;
  onSubmit: (paylaod: IAsignar) => void;
  methods: any;
  inspectores: IUsuarios[];
}

export const ModalAsignar = ({
  current,
  onClose,
  open,
  methods,
  onSubmit,
  inspectores,
}: Props) => {
  const {
    handleSubmit,
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

  return (
    <Modal
      title={current ? "Asignar Inspector" : "Reasignar Inspector"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col xs={24} md={24}>
            <div className="mb-4">
              <label>Inspector asignado</label>
              <Controller
                name="id_inspector"
                control={control}
                rules={{
                  required: "Por favor seleccione el inspector",
                }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder="Seleccione inspector"
                      style={{ width: "100%" }}
                      optionFilterProp="label"
                      options={formatInspectores}
                      value={field.value ?? null}
                      onChange={(v) => field.onChange(v ?? null)}
                    />
                    {errors.id_inspector?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.id_inspector?.message)}
                      </span>
                    )}
                  </>
                )}
              />
              {errors?.ruta?.id_inspector && (
                <span style={{ color: "red" }}>
                  {errors.ruta.id_inspector.message as string}
                </span>
              )}
            </div>
          </Col>
          <Col xs={24}>
            <div className="mb-4">
              <label>Motivo</label>
              <Controller
                name="motivo"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <Input.TextArea rows={3} placeholder="Motivo" {...field} />
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
            {current ? "Asignar" : "Reasignar"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
