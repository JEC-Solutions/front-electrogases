import {
  IAccion,
  IRoles,
} from "@/features/private/configuracion/roles/interfaces";
import { Button, Checkbox, Modal, Row, Col, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  acciones: IAccion[];
  accionesRol: IAccion[];
  isLoading: boolean;
  currentRol: IRoles | null;
  onSubmit: (data: { id_acciones: number[] }) => void;
}

export const ModalAcciones = ({
  open,
  onClose,
  acciones,
  accionesRol,
  isLoading,
  currentRol,
  onSubmit,
}: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open && accionesRol) {
      setSelectedIds(accionesRol.map((a) => a.id_accion));
    }
  }, [open, accionesRol]);

  const handleSave = () => {
    onSubmit({ id_acciones: selectedIds });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const groupedAcciones = acciones.reduce(
    (acc: Record<string, IAccion[]>, curr) => {
      const groupName = curr.codigo.split(":")[0] || "otros";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(curr);
      return acc;
    },
    {},
  );

  const groupKeys = Object.keys(groupedAcciones).sort();

  const tabItems = groupKeys.map((key) => ({
    key: key,
    label: <span className="capitalize">{key}</span>,
    children: (
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-lg font-semibold capitalize text-indigo-700">
            Módulo: {key}
          </h3>
          <span className="text-sm text-gray-400">
            {groupedAcciones[key].length} acciones disponibles
          </span>
        </div>
        <Row gutter={[16, 24]}>
          {groupedAcciones[key].map((accion: IAccion) => (
            <Col xs={24} sm={12} key={accion.id_accion}>
              <div className="flex items-start hover:bg-gray-50 p-2 rounded-md transition-colors duration-200">
                <Checkbox
                  id={`accion-${accion.id_accion}`}
                  checked={selectedIds.includes(accion.id_accion)}
                  onChange={(e) =>
                    handleCheckboxChange(accion.id_accion, e.target.checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor={`accion-${accion.id_accion}`}
                  className="flex flex-col ml-3 cursor-pointer"
                >
                  <span className="font-semibold text-gray-800 text-sm">
                    {accion.nombre}
                  </span>
                  <span className="text-[11px] leading-tight text-gray-400 mt-1 max-w-[280px]">
                    {accion.descripcion}
                  </span>
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    ),
  }));

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Configurar Acciones
          </span>
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-gray-500 font-medium">
            {currentRol?.nombre_rol || "Cargando..."}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} className="rounded-lg px-6">
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-lg px-8"
        >
          Guardar Cambios
        </Button>,
      ]}
      width={900}
      centered
      destroyOnHidden
      styles={{
        body: {
          padding: "20px 24px 10px 24px",
          minHeight: "500px",
        },
      }}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Spin size="large" />
          <p className="text-gray-400 font-medium">
            Sincronizando permisos del rol...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl">
          <div className="mb-6 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
            <p className="text-indigo-800 text-sm m-0">
              Personaliza el acceso de los usuarios con este rol habilitando o
              deshabilitando funcionalidades específicas del API.
            </p>
          </div>
          <div className="acciones-container" style={{ minHeight: "450px" }}>
            <Tabs
              items={tabItems}
              tabPosition="left"
              className="custom-tabs"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
