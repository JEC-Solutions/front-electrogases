import {
  IDepartamentos,
  IDepartamento,
} from "@/features/private/configuracion/departamentos/interfaces";
import { Button, Input, Modal, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (data: IDepartamentos) => void;
  currentDpto: IDepartamento | null;
}

export const ModalDepartamentos = ({
  currentDpto,
  methods,
  onSubmit,
  onClose,
  open,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentDpto ? "Editar Departamento" : "Agregar Departamento"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre">Codigo</label>
          <Controller
            name="codigo"
            control={control}
            rules={{ required: "Por favor ingrese el codigo del departamento" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="codigo"
                  placeholder="Codigo del Departamento"
                />

                {errors.codigo?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.codigo.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nombre">Nombre</label>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "Por favor ingrese el nombre del departamento" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="nombre"
                  placeholder="Nombre del Departamento"
                />

                {errors.nombre?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.nombre.message)}
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
            {currentDpto ? "Guardar Cambios" : "Crear Departamento"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
