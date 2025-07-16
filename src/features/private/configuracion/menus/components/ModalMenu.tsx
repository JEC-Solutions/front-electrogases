import {
  IMenus,
  IMenu,
} from "@/features/private/configuracion/menus/interface";
import { Button, Input, Modal, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IMenu) => void;
  currentMenu: IMenus | null;
}

export const ModalMenu = ({
  currentMenu,
  methods,
  onClose,
  onSubmit,
  open,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentMenu ? "Editar Menu" : "Agregar Menu"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre">Nombre</label>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            rules={{ required: "Por favor ingrese el nombre del menu" }}
            render={({ field }) => (
              <>
                <Input {...field} id="nombre" placeholder="Nombre del Menu" />

                {errors.nombre?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.nombre.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="icono">Icono</label>
          <Controller
            name="icono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Input {...field} id="icono" placeholder="Icono del Menu" />
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
            {currentMenu ? "Guardar Cambios" : "Crear Menu"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
