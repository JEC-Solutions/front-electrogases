import { IRole } from "@/features/private/configuracion/roles/interfaces";
import { Button, Input, Modal, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IRole) => void;
  currentRol: IRole | null;
}

export const ModalRoles = ({ methods, onClose, open, onSubmit, currentRol }: Props) => {
  return (
    <Modal
      title={currentRol ? "Editar Rol" : "Agregar Rol"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre_rol">Nombre</label>
          <Controller
            name="nombre_rol"
            control={methods.control}
            rules={{ required: "Por favor ingrese el nombre del rol" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="nombre_rol"
                  placeholder="Nombre del Rol"
                />

                {methods.formState.errors.nombre_rol?.message && (
                  <span style={{ color: "red" }}>
                    {String(methods.formState.errors.nombre_rol.message)}
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
            {currentRol ? "Guardar Cambios" : "Crear Rol"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
