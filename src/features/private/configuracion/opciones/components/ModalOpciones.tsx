import {
  IOpciones,
  IOpcion,
} from "@/features/private/configuracion/opciones/interfaces";
import { IMenus } from "@/features/private/configuracion/menus/interface";
import { Button, Input, Modal, Select, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IOpcion) => void;
  currentMenu: IOpciones | null;
  menus: IMenus[];
}

export const ModalOpciones = ({
  currentMenu,
  methods,
  onClose,
  onSubmit,
  open,
  menus,
}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <Modal
      title={currentMenu ? "Editar Opción" : "Agregar Opción"}
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
          <label htmlFor="link">Link</label>
          <Controller
            name="link"
            control={control}
            defaultValue=""
            rules={{ required: "Por favor ingrese el link de la opción" }}
            render={({ field }) => (
              <>
                <Input {...field} id="link" placeholder="Link de la Opción" />

                {errors.link?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.link.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="id_menu">Menu</label>
          <Controller
            name="id_menu"
            control={control}
            rules={{ required: "Por favor seleccione un menu" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  id="id_menu"
                  showSearch
                  allowClear
                  placeholder="Seleccione un menu"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  options={menus.map((d) => ({
                    label: d.nombre,
                    value: d.id_menu,
                  }))}
                  onChange={(value) => field.onChange(value ?? "")}
                  value={field.value ?? undefined}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
                {errors.id_menu?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.id_menu.message)}
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
            {currentMenu ? "Guardar Cambios" : "Crear Opción"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
