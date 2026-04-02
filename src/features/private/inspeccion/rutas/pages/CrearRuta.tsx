import { useCrearRutas } from "@/features/private/inspeccion/rutas/hooks";
import { Button, Space, Steps, Card } from "antd";
import { useState } from "react";
import {
  StepCasa,
  StepCliente,
  StepRuta,
} from "@/features/private/inspeccion/rutas/components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export const CrearRuta = () => {
  const { methods, onSubmit, dataTipoVisita, getUserDocument, inspectores, asesores } =
    useCrearRutas();

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const next = async () => {
    if (currentStep === 0) {
      const isValid = await methods.trigger([
        "cliente.primer_nombre",
        "cliente.primer_apellido",
        "cliente.id_tipo_documento",
        "cliente.numero_documento",
        "cliente.telefono",
      ]);

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completa todos los campos obligatorios del cliente antes de continuar.",
        });
        return;
      }
    } else if (currentStep === 1) {
      const isValid = await methods.trigger([
        "casa.direccion",
        "casa.barrio",
        "casa.id_tipo_visita",
        "casa.id_departamento",
        "casa.id_ciudad",
      ]);

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completa todos los campos obligatorios del cliente antes de continuar.",
        });
        return;
      }
    } else if (currentStep === 2) {
      const isValid = await methods.trigger([
        "ruta.fecha",
        "ruta.hora",
        "ruta.id_asesor",
      ]);

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completa todos los campos obligatorios del cliente antes de continuar.",
        });
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };
  const prev = () => setCurrentStep((prev) => prev - 1);

  const onFinish = methods.handleSubmit(onSubmit);

  const handleBack = () => {
    navigate("/dashboard/inspecciones/rutas");
  };

  return (
    <Card>
      <Button
        type="primary"
        htmlType="button"
        className="mb-4"
        onClick={handleBack}
      >
        Regresar
      </Button>

      <Steps
        current={currentStep}
        className="mb-6"
        items={[
          { title: "Cliente" },
          { title: "Casa" },
          { title: "Ruta" },
        ]}
      />

      <form onSubmit={onFinish}>
        {currentStep === 0 && (
          <StepCliente methods={methods} onFindDocument={getUserDocument} />
        )}

        {currentStep === 1 && <StepCasa methods={methods} />}

        {currentStep === 2 && (
          <StepRuta
            methods={methods}
            inspectores={inspectores}
            tiposVisita={dataTipoVisita}
            asesores={asesores}
          />
        )}

        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          {currentStep > 0 && <Button onClick={prev}>Anterior</Button>}

          {currentStep < 2 && (
            <Button type="primary" onClick={next}>
              Siguiente
            </Button>
          )}

          {currentStep === 2 && (
            <Button type="primary" htmlType="submit">
              Crear Ruta
            </Button>
          )}
        </Space>
      </form>
    </Card>
  );
};
