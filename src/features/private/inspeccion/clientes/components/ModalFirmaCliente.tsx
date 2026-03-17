import { IClientes, IInspeccionFirma } from "@/features/private/inspeccion/clientes/interfaces";
import { Button, Modal, Radio, Spin, Tag, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  cliente: IClientes | null;
  inspecciones: IInspeccionFirma[];
  loadingInspecciones: boolean;
  onUpdateFirma: (idInspeccion: number, file: File) => void;
  isUpdating: boolean;
}

export const ModalFirmaCliente = ({
  open,
  onClose,
  cliente,
  inspecciones,
  loadingInspecciones,
  onUpdateFirma,
  isUpdating,
}: Props) => {
  const [selectedInspeccion, setSelectedInspeccion] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClose = () => {
    setSelectedInspeccion(null);
    setSelectedFile(null);
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedInspeccion || !selectedFile) return;
    onUpdateFirma(selectedInspeccion, selectedFile);
  };

  const nombreCompleto = cliente
    ? `${cliente.primer_nombre} ${cliente.segundo_nombre ?? ""} ${cliente.primer_apellido} ${cliente.segundo_apellido ?? ""}`.trim()
    : "";

  return (
    <Modal
      title={`Actualizar Firma — ${nombreCompleto}`}
      open={open}
      onCancel={handleClose}
      width={580}
      footer={[
        <Button key="cancel" onClick={handleClose} disabled={isUpdating}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isUpdating}
          disabled={!selectedInspeccion || !selectedFile}
        >
          Actualizar Firma
        </Button>,
      ]}
    >
      {/* Paso 1: seleccionar inspección */}
      <div className="mb-4">
        <p className="font-semibold mb-2">1. Selecciona la inspección</p>

        {loadingInspecciones ? (
          <div style={{ textAlign: "center", padding: 24 }}>
            <Spin />
          </div>
        ) : inspecciones.length === 0 ? (
          <p style={{ color: "#999" }}>
            Este cliente no tiene inspecciones registradas.
          </p>
        ) : (
          <Radio.Group
            value={selectedInspeccion}
            onChange={(e) => setSelectedInspeccion(e.target.value)}
            style={{ width: "100%" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {inspecciones.map((insp) => (
                <Radio
                  key={insp.id_inspeccion}
                  value={insp.id_inspeccion}
                  disabled={!insp.tiene_firma}
                >
                  <span>
                    <strong>
                      #{insp.id_inspeccion}
                      {insp.numero_certificado
                        ? ` — Cert. ${insp.numero_certificado}`
                        : ""}
                    </strong>
                    {"  "}
                    <span style={{ color: "#888", fontSize: 12 }}>
                      {new Date(insp.fecha_inspeccion).toLocaleDateString("es-CO")}
                    </span>
                    {"  "}
                    {insp.tiene_firma ? (
                      <Tag color="green">Con firma</Tag>
                    ) : (
                      <Tag color="orange">Sin firma</Tag>
                    )}
                  </span>
                </Radio>
              ))}
            </div>
          </Radio.Group>
        )}
      </div>

      {/* Paso 2: subir nueva imagen */}
      <div>
        <p className="font-semibold mb-2">2. Carga la nueva firma (imagen PNG)</p>
        <Upload.Dragger
          accept="image/*"
          maxCount={1}
          beforeUpload={(file) => {
            setSelectedFile(file);
            return false; // evitar subida automática
          }}
          onRemove={() => setSelectedFile(null)}
          fileList={
            selectedFile
              ? [
                  {
                    uid: "-1",
                    name: selectedFile.name,
                    status: "done",
                  },
                ]
              : []
          }
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Haz clic o arrastra la imagen aquí
          </p>
          <p className="ant-upload-hint">
            Se recomienda PNG con fondo transparente
          </p>
        </Upload.Dragger>
      </div>
    </Modal>
  );
};
