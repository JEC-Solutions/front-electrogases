import {
  ITipoDocumento,
  ITipoDocumentos,
} from "@/features/private/configuracion/tipos_documentos/interfaces";
import { Button, Input, Modal, Space } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: (values: ITipoDocumento) => void;
  currentTipoDocumento: ITipoDocumentos | null;
}

export const ModalTipoDocumentos = ({
  currentTipoDocumento,
  methods,
  onClose,
  onSubmit,
  open,
}: Props) => {
  return (
    <Modal
      title={
        currentTipoDocumento
          ? "Editar Tipo de Documento"
          : "Agregar Tipo de Documento"
      }
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre">Nombre</label>
          <Controller
            name="nombre"
            control={methods.control}
            rules={{
              required: "Por favor ingrese el nombre del tipo de documento",
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="nombre"
                  placeholder="Nombre del Tipo de Documento"
                />

                {methods.formState.errors.nombre?.message && (
                  <span style={{ color: "red" }}>
                    {String(methods.formState.errors.nombre.message)}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="abreviacion">Abreviación</label>
          <Controller
            name="abreviacion"
            control={methods.control}
            rules={{
              required:
                "Por favor ingrese la abreviación del tipo de documento",
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="abreviacion"
                  placeholder="Abreviación del Tipo de Documento"
                />

                {methods.formState.errors.abreviacion?.message && (
                  <span style={{ color: "red" }}>
                    {String(methods.formState.errors.abreviacion.message)}
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
            {currentTipoDocumento
              ? "Guardar Cambios"
              : "Crear Tipo de Documento"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
