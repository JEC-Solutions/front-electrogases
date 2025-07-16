import { ICiudad } from "@/features/private/configuracion/ciudad/interfaces";
import {
  IDepartamentos,
  IDepartamento,
} from "@/features/private/configuracion/departamentos/interfaces";
import { Button, Input, Modal, Select, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  departamentos: IDepartamentos[];
  onSubmit: (data: ICiudad) => void;
  currentCiudad: IDepartamento | null;
}

export const ModalCiudad = ({
  currentCiudad,
  departamentos,
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
      title={currentCiudad ? "Editar Ciudad" : "Agregar Ciudad"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="codigo_municipio">Codigo</label>
          <Controller
            name="codigo_municipio"
            control={control}
            rules={{ required: "Por favor ingrese el codigo del municipio" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="codigo_municipio"
                  placeholder="Codigo del Municipio"
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

        <div className="mb-4">
          <label htmlFor="id_departamento">Departamento</label>
          <Controller
            name="id_departamento"
            control={control}
            rules={{ required: "Por favor seleccione un departamento" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  id="departamento"
                  showSearch
                  allowClear
                  placeholder="Seleccione un departamento"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  options={departamentos.map((d) => ({
                    label: d.nombre,
                    value: d.codigo,
                  }))}
                  onChange={(value) => field.onChange(value ?? "")}
                  value={field.value ?? undefined}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
                {errors.departamento?.message && (
                  <span style={{ color: "red" }}>
                    {String(errors.departamento.message)}
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
            {currentCiudad ? "Guardar Cambios" : "Crear Ciudad"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
