import { useState } from "react";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { Button, Col, Input, Row, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

interface Props {
  inspectores: IUsuarios[];
  onOpenCurrent: (cliente: IUsuarios) => void;
  onStatus: (id: number) => void;
}

export const TableInspectoresUsuarios = ({
  inspectores,
  onOpenCurrent,
  onStatus,
}: Props) => {
  const [filtroTexto, setFiltroTexto] = useState("");

  const normalize = (s: string) =>
    (s ?? "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const datosFiltered = inspectores.filter((inspector) => {
    const p = inspector.persona;
    const fullName = `${p?.primer_nombre ?? ""} ${p?.segundo_nombre ?? ""} ${p?.primer_apellido ?? ""} ${p?.segundo_apellido ?? ""}`;
    const doc = p?.numero_documento ?? "";
    const email = p?.email ?? "";
    const user = inspector.usuario ?? "";

    const query = normalize(filtroTexto);
    const matchTexto =
      !query ||
      normalize(fullName).includes(query) ||
      normalize(doc).includes(query) ||
      normalize(email).includes(query) ||
      normalize(user).includes(query);

    return matchTexto;
  });

  const limpiarFiltros = () => {
    setFiltroTexto("");
  };

  const columns = [
    {
      title: "Nombre completo",
      key: "nombre_completo",
      render: (_: any, record: IUsuarios) => {
        const p = record.persona;
        return `${p.primer_nombre} ${p.segundo_nombre || ""} ${
          p.primer_apellido
        } ${p.segundo_apellido || ""}`;
      },
    },
    {
      title: "Numero Documento",
      key: "numero_documento",
      render: (_: any, record: IUsuarios) =>
        record.persona?.numero_documento || "-",
    },
    {
      title: "No. Certificado",
      dataIndex: "certificado_no",
      key: "certificado_no",
      render: (text: string) =>
        text ? (
          <div>
            {text.split("/").map((item, index) => (
              <div key={index}>{item.trim()}</div>
            ))}
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Entidad",
      dataIndex: "entidad",
      key: "entidad",
      render: (text: string) => text || "-",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia",
      key: "vigencia",
      render: (text: string) =>
        text ? (
          <div>
            {text.split("/").map((item, index) => (
              <div key={index}>{item.trim()}</div>
            ))}
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Correo",
      key: "email",
      render: (_: any, record: IUsuarios) => record.persona?.email || "-",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Rol",
      key: "rol",
      render: (_: any, record: IUsuarios) => record.rol?.nombre_rol || "-",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: boolean) =>
        estado ? (
          <Tag color="green">Activo</Tag>
        ) : (
          <Tag color="red">Inactivo</Tag>
        ),
    },
    {
      title: "Firma",
      key: "tieneFirma",
      render: (_: any, record: IUsuarios) =>
        (record as any).tieneFirma ? (
          <Tag color="green">Cargada</Tag>
        ) : (
          <Tag color="red">Falta</Tag>
        ),
    },
    {
      title: "Sello",
      key: "tieneSello",
      render: (_: any, record: IUsuarios) =>
        (record as any).tieneSello ? (
          <Tag color="green">Cargado</Tag>
        ) : (
          <Tag color="red">Falta</Tag>
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: IUsuarios) => (
        <Space>
          <Tooltip title="Editar Cliente">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_usuario)}>
              {record.estado ? (
                <FaLock style={{ color: "#ff4d4f" }} />
              ) : (
                <FaUnlock style={{ color: "#52c41a" }} />
              )}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Filtros */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={16} md={18}>
          <Input
            placeholder="Buscar por nombre, documento, usuario o correo..."
            style={{ width: "100%" }}
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={8} md={6}>
          <Button onClick={limpiarFiltros} className="w-full sm:w-auto">
            Limpiar filtros
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={datosFiltered}
        rowKey="id_usuario"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        scroll={{ x: 600 }}
      />
    </div>
  );
};
