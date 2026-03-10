import { Button, Input, Modal, Select, Space, Row, Col } from "antd";
import { useInspectoresUsuarios } from "@/features/private/inspectores/usuarios/hooks";
import {
  IEquiposUtilizados,
  IEquiposUtilizadosRequest,
} from "@/features/private/inspectores/equiposUtilizados/interfaces";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IEquiposUtilizadosRequest) => void;
  currentEquipo: IEquiposUtilizados | null;
}

const equipos = [
  {
    value: "MANOMETRO ANALOGO",
    label: "MANOMETRO ANALOGO",
  },
  {
    value: "DETECTOR DE FUGAS DE PROPANO",
    label: "DETECTOR DE FUGAS DE PROPANO",
  },
  {
    value: "DETECTOR DE FUGAS DE METANO",
    label: "DETECTOR DE FUGAS DE METANO",
  },
  {
    value: "DETECTOR DE MONOXIDO",
    label: "DETECTOR DE MONOXIDO",
  },
  {
    value: "FLEXOMETRO",
    label: "FLEXOMETRO",
  },
  {
    value: "CALIBRADOR PIE DE REY",
    label: "CALIBRADOR PIE DE REY",
  },
];

export const ModalEquiposUtilizados = ({
  open,
  onClose,
  methods,
  onSubmit,
  currentEquipo,
}: Props) => {
  const { inspectores } = useInspectoresUsuarios();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentEquipo ? "Editar Equipo" : "Agregar Equipo Utilizado"}
      open={open}
      onCancel={() => {
        onClose();
        methods.reset();
      }}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="equiposUtilizados">Equipo Utilizado</label>
              <Controller
                name="equiposUtilizados"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor seleccione el equipo" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="equiposUtilizados"
                      placeholder="Seleccione un equipo"
                      style={{ width: "100%" }}
                      options={equipos}
                      onChange={(value) => field.onChange(value)}
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                    {errors.equiposUtilizados?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.equiposUtilizados.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="ns">Número de Serie (NS)</label>
              <Controller
                name="ns"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el número de serie" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="ns"
                      placeholder="Número de serie"
                      type="text"
                    />
                    {errors.ns?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.ns.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="marca">Marca</label>
              <Controller
                name="marca"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese la marca" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="marca"
                      placeholder="Marca"
                      type="text"
                    />
                    {errors.marca?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.marca.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24} md={12}>
            <div className="mb-4">
              <label htmlFor="modelo">Modelo</label>
              <Controller
                name="modelo"
                control={control}
                defaultValue=""
                rules={{ required: "Por favor ingrese el modelo" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="modelo"
                      placeholder="Modelo"
                      type="text"
                    />
                    {errors.modelo?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.modelo.message)}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Col>

          <Col span={24}>
            <div className="mb-4">
              <label htmlFor="personas">Inspectores Asignados</label>
              <Controller
                name="personas"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      mode="multiple"
                      id="personas"
                      showSearch
                      allowClear
                      placeholder="Seleccione inspectores"
                      style={{ width: "100%" }}
                      optionFilterProp="label"
                      options={inspectores.map((i) => ({
                        label: `${i.persona.primer_nombre} ${i.persona.primer_apellido}`,
                        value: i.persona.id_persona,
                      }))}
                      onChange={(value) => field.onChange(value)}
                      value={field.value || []}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                    {errors.personas?.message && (
                      <span style={{ color: "red" }}>
                        {String(errors.personas.message)}
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
            onClick={() => {
              onClose();
              methods.reset();
            }}
          >
            Cancelar
          </Button>

          <Button type="primary" htmlType="submit">
            {currentEquipo ? "Guardar Cambios" : "Crear Equipo"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
