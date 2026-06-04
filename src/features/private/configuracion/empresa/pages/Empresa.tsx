import { useEmpresa } from "@/features/private/configuracion/empresa/hooks";
import { Button, Card, Spin, Input, Row, Col, Divider, Alert } from "antd";
import { Controller } from "react-hook-form";
import {
  SaveOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  BuildOutlined
} from "@ant-design/icons";

export const Empresa = () => {
  const {
    isLoading,
    isError,
    error,
    methodsEmpresa,
    onSubmit,
  } = useEmpresa();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methodsEmpresa;

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Configuración General
        </h1>
        <p className="text-gray-600">
          Administra la información de la empresa, datos de acreditación del organismo y la versión activa del sistema.
        </p>
      </div>

      <Card
        className="shadow-md rounded-xl border border-gray-100"
        style={{ maxWidth: 850 }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <Spin size="large" tip="Cargando configuración..." />
          </div>
        ) : isError ? (
          <div style={{ padding: "40px 0" }}>
            <Alert
              message="Error de Carga"
              description={
                error instanceof Error
                  ? error.message
                  : "Ocurrió un error inesperado al intentar cargar los datos. Inténtalo de nuevo más tarde."
              }
              type="error"
              showIcon
              style={{ maxWidth: 600, margin: "0 auto" }}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Sección 1: Datos del Organismo */}
            <div className="flex items-center gap-2 mb-4">
              <SafetyCertificateOutlined className="text-blue-500 text-xl" />
              <h2 className="text-lg font-bold text-gray-800 m-0">
                Datos del Organismo de Inspección
              </h2>
            </div>
            
            <p className="text-gray-500 text-sm mb-6">
              Esta información se registrará de forma histórica como un "snapshot" en cada nueva acta generada. Los cambios realizados aquí no afectarán las actas ya existentes.
            </p>

            <Row gutter={[24, 16]}>
              <Col span={24} md={16}>
                <div className="mb-2">
                  <label htmlFor="empresa" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Nombre de la Empresa / Organismo
                  </label>
                  <Controller
                    name="empresa"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El nombre de la empresa es obligatorio" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="empresa"
                          size="large"
                          placeholder="Ej. OI ELECTROGASES S.A.S"
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.empresa?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.empresa.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>

              <Col span={24} md={8}>
                <div className="mb-2">
                  <label htmlFor="nit" className="block text-gray-700 font-semibold mb-1 text-sm">
                    NIT
                  </label>
                  <Controller
                    name="nit"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El NIT es obligatorio" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="nit"
                          size="large"
                          placeholder="Ej. 901106969-6"
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.nit?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.nit.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>

              <Col span={24}>
                <div className="mb-2">
                  <label htmlFor="direccion" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Dirección
                  </label>
                  <Controller
                    name="direccion"
                    control={control}
                    defaultValue=""
                    rules={{ required: "La dirección es obligatoria" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="direccion"
                          size="large"
                          placeholder="Ej. Cl 14N #4A-53 Portachuelo"
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.direccion?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.direccion.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>

              <Col span={24} md={12}>
                <div className="mb-2">
                  <label htmlFor="telefono1" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Teléfono Principal
                  </label>
                  <Controller
                    name="telefono1"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El teléfono principal es obligatorio" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="telefono1"
                          size="large"
                          placeholder="Ej. 3503732122"
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.telefono1?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.telefono1.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>

              <Col span={24} md={12}>
                <div className="mb-2">
                  <label htmlFor="telefono2" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Teléfono Secundario (Opcional)
                  </label>
                  <Controller
                    name="telefono2"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="telefono2"
                        size="large"
                        placeholder="Ej. 5492370"
                        type="text"
                        className="rounded-lg"
                      />
                    )}
                  />
                </div>
              </Col>

              <Col span={24} md={12}>
                <div className="mb-2">
                  <label htmlFor="acreditacion" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Acreditación ONAC
                  </label>
                  <Controller
                    name="acreditacion"
                    control={control}
                    defaultValue=""
                    rules={{ required: "La acreditación es obligatoria" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="acreditacion"
                          size="large"
                          placeholder="Ej. 18-OIN-021"
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.acreditacion?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.acreditacion.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Divider className="my-6" />

            {/* Sección 2: Configuración del Sistema */}
            <div className="flex items-center gap-2 mb-4">
              <SettingOutlined className="text-indigo-500 text-xl" />
              <h2 className="text-lg font-bold text-gray-800 m-0">
                Configuración del Sistema
              </h2>
            </div>

            <Row gutter={[24, 16]}>
              <Col span={24} md={12}>
                <div className="mb-2">
                  <label htmlFor="version_app" className="block text-gray-700 font-semibold mb-1 text-sm">
                    Versión de la Aplicación
                  </label>
                  <Controller
                    name="version_app"
                    control={control}
                    defaultValue=""
                    rules={{ required: "La versión de la aplicación es obligatoria" }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="version_app"
                          size="large"
                          placeholder="Ej. 1.0.0"
                          prefix={<BuildOutlined className="text-gray-400" />}
                          type="text"
                          className="rounded-lg"
                        />
                        {errors.version_app?.message && (
                          <span style={{ color: "#ff4d4f", fontSize: "12px", display: "block", marginTop: "4px" }}>
                            {String(errors.version_app.message)}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>
            </Row>

            <div className="mt-8 flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SaveOutlined />}
                className="rounded-lg px-6 font-semibold shadow-md bg-blue-600 hover:bg-blue-700 border-none flex items-center gap-2"
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
