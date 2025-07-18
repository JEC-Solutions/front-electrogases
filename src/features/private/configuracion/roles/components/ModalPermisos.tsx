import {
  IRoles,
  IPermiso,
  IPermisosRol,
} from "@/features/private/configuracion/roles/interfaces";
import { IOpciones } from "@/features/private/configuracion/opciones/interfaces";
import { Button, Checkbox, Divider, Modal, Space } from "antd";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: IPermiso) => void;
  opciones: IOpciones[];
  permisosRol: IPermisosRol[];
  currentRol: IRoles | null;
}

export const ModalPermisos = ({
  methods,
  onClose,
  onSubmit,
  open,
  opciones,
  permisosRol,
  currentRol,
}: Props) => {
  const { control, handleSubmit } = methods;

  // Extraer IDs de opciones que ya tiene el rol como permiso
  const opcionesAsignadas = permisosRol.map((p) => p.id_opcion);

  // Agrupar opciones por menú
  const opcionesPorMenu = opciones.reduce(
    (acc: Record<string, IOpciones[]>, opcion) => {
      const menu = opcion.menu?.nombre || "Sin menú";
      if (!acc[menu]) acc[menu] = [];
      acc[menu].push(opcion);
      return acc;
    },
    {}
  );

  useEffect(() => {
    const opcionesAsignadas = permisosRol.map((p) => p.id_opcion);
    methods.setValue("id_opciones", opcionesAsignadas);
  }, [permisosRol, currentRol?.id_rol]);

  return (
    <Modal
      title={`Agregar permisos para el Rol ${currentRol?.nombre_rol || "..."}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <form
        onSubmit={handleSubmit((values: { id_opciones: number[] }) => {
          onSubmit({
            id_rol: currentRol?.id_rol || 0,
            id_opciones: values.id_opciones,
          });
        })}
      >
        <div className="mb-4">
          <Controller
            name="id_opciones"
            control={control}
            defaultValue={opcionesAsignadas}
            render={({ field }) => (
              <div
                style={{
                  maxHeight: 300,
                  overflowY: "auto",
                  padding: "8px 12px",
                  border: "1px solid #d9d9d9",
                  borderRadius: 6,
                }}
              >
                {Object.entries(opcionesPorMenu).map(
                  ([menuNombre, opciones]) => (
                    <div key={menuNombre} style={{ marginBottom: 12 }}>
                      <Divider orientation="left">{menuNombre}</Divider>
                      {opciones.map((op) => {
                        const checked = field.value?.includes(op.id_opcion);

                        const toggle = () => {
                          if (checked) {
                            field.onChange(
                              field.value.filter(
                                (id: number) => id !== op.id_opcion
                              )
                            );
                          } else {
                            field.onChange([...field.value, op.id_opcion]);
                          }
                        };

                        return (
                          <Checkbox
                            key={op.id_opcion}
                            checked={checked}
                            onChange={toggle}
                          >
                            {op.nombre}
                          </Checkbox>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )}
          />
        </div>

        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="default"
            onClick={() => {
              onClose();
              methods.reset({
                id_opciones: [],
              });
            }}
          >
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Guardar permisos
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
