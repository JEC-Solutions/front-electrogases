import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { Header } from "./Header";
import { DatosUsuario } from "./DatosUsuario";
import { CaracteristicasMatriz } from "./CaracteristicasMatriz";
import { EmpresaInstalador } from "./EmpresaInstalador";
import { EvaluacionDocumentacion } from "./EvaluacionDocumentacion";
import { PruebaHermeticidad } from "./PruebaHermeticidad";
import { Defectologia } from "./Defectologia";
import { RegistroEquipos } from "./RegistroEquipos";
import { ParametrosDiseno } from "./ParametrosDiseno";
import { Isometrico } from "./Isometrico";
import { DeclaracionConformidad } from "./DeclaracionConformidad";

interface Props {
  inspeccion: IActa | undefined;
  isometricoBase64: string | undefined;
  firmaBase64: string | undefined;
  firmaInspectorBase64: string | null;
  selloInspectorBase64: string | null;
}

export const Matrices = ({
  inspeccion,
  isometricoBase64,
  firmaBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  return (
    <>
      {/* Header */}
      <Header inspeccion={inspeccion} />

      {/* 1. Datos del usuario & 2. Organismo de inspección */}
      <DatosUsuario inspeccion={inspeccion} />

      {/* 3. Características de la línea matriz & Solicitud del cliente */}
      <CaracteristicasMatriz inspeccion={inspeccion} />

      {/* 4. Información para líneas matrices nuevas - 4.1 Empresa e instalador */}
      <EmpresaInstalador inspeccion={inspeccion} />

      {/* 4.2 Evaluación documental y requisitos normativos aplicables */}
      <EvaluacionDocumentacion inspeccion={inspeccion} />

      {/* 5. Prueba de hermeticidad */}
      <PruebaHermeticidad inspeccion={inspeccion} />

      {/* 6. Defectología */}
      <Defectologia inspeccion={inspeccion} />

      {/* 7. Registro de equipos utilizados en la inspección */}
      <RegistroEquipos inspeccion={inspeccion} />

      {/* 8. Parámetros de diseño */}
      <ParametrosDiseno inspeccion={inspeccion} />

      {/* 9. Isométrico */}
      <Isometrico isometricoBase64={isometricoBase64} />

      {/* 10. Declaración de conformidad */}
      <DeclaracionConformidad
        inspeccion={inspeccion}
        firmaClienteBase64={firmaBase64}
        firmaInspectorBase64={firmaInspectorBase64}
        selloInspectorBase64={selloInspectorBase64}
      />
    </>
  );
};
