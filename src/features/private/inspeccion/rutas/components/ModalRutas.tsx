import {
  IRutas,
  IRuta,
  Casa,
  Inspector,
} from "@/features/private/inspeccion/rutas/interfaces";
import { Button, DatePicker, Select, Modal, Space, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IRuta) => void;
  currentRuta: IRutas | null;
  casas: Casa[];
  inspectores: Inspector[];
  onOpenCasa: () => void;
}

export const ModalRutas = ({
  currentRuta,
  methods,
  onClose,
  onSubmit,
  open,
  casas,
  inspectores,
  onOpenCasa,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentRuta ? "Editar Ruta de Inspección" : "Nueva Ruta de Inspección"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="fecha">Fecha de Inspección</label>
              <Controller
                name="fecha"
                control={control}
                defaultValue={currentRuta ? dayjs(currentRuta.fecha) : undefined}
                rules={{ required: "Por favor seleccione la fecha" }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      id="fecha"
                      style={{ width: "100%" }}
                      format="YYYY-MM-DD"
                      placeholder="Seleccione la fecha"
                    />
                    {errors.fecha?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.fecha.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={12}>
            <div className="mb-4">
              <label htmlFor="hora">Hora de Inspección</label>
              <Controller
                name="hora"
                control={control}
                defaultValue={currentRuta?.hora || ""}
                rules={{ required: "Por favor ingrese la hora" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      id="hora"
                      type="time"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "6px",
                      }}
                    />
                    {errors.hora?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.hora.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <label htmlFor="id_casa">Casa a Inspeccionar</label>
          <Controller
            name="id_casa"
            control={control}
            defaultValue={currentRuta?.casa.id_casa || undefined}
            rules={{ required: "Por favor seleccione una casa" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  id="id_casa"
                  style={{ width: "100%" }}
                  placeholder="Seleccione una casa"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  options={casas.map((casa) => ({
                    value: casa.id_casa,
                    label: `${casa.medidor} - ${casa.direccion} (${casa.cliente.primer_nombre} ${casa.cliente.primer_apellido})`,
                  }))}
                />
                {errors.id_casa?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.id_casa.message)}
                  </span>
                )}
              </>
            )}
          />
          <div className="mt-2">
            <Button type="dashed" onClick={onOpenCasa}>
              + Registrar Nueva Casa
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="id_inspector">Inspector Asignado</label>
          <Controller
            name="id_inspector"
            control={control}
            defaultValue={currentRuta?.inspector.id_usuario || undefined}
            rules={{ required: "Por favor seleccione un inspector" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  id="id_inspector"
                  style={{ width: "100%" }}
                  placeholder="Seleccione un inspector"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  options={inspectores.map((inspector) => ({
                    value: inspector.id_usuario,
                    label: `${inspector.primer_nombre} ${inspector.primer_apellido} (${inspector.email})`,
                  }))}
                />
                {errors.id_inspector?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.id_inspector.message)}
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
            {currentRuta ? "Actualizar Ruta" : "Crear Ruta"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
