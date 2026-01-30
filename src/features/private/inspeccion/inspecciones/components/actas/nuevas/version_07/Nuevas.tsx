import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { Header } from "./Header";
import { DatosUsuario } from "./DatosUsuario";
import { InformacionGeneral } from "./InformacionGeneral";
import { TrazabilidadMatriz } from "../../periodicas/version_07/TrazabilidadMatriz";
import { TrazaVacioInterno } from "../../periodicas/version_07/TrazaVacioInterno";
import { CentroMedicion } from "./CentroMedicion";
import { Instalador } from "./Instalador";
import { EvaluacionDocumentacion } from "./EvaluacionDocumentacion";
import { ParametrosDisenio } from "./ParametrosDisenio";
import { EvaluacionRecintos } from "./EvaluacionRecintos";
import { Isometricos } from "./Isometricos";
import { Ventilacion } from "./Ventilacion";
import { ParametrosEvaluacion } from "./ParametrosEvaluacion";
import { Defectologias } from "./Defectologias";
import { EquiposUtilizados } from "./EquiposUtilizados";
import { DeclaracionConformidad } from "./DeclaracionConformidad";
import { Footer } from "./Footer";

interface Props {
  inspeccion: IActa | undefined;
  isometricoBase64: string | undefined;
  esquemaPlantaBase64: string | undefined;
  firmaBase64: string | undefined;
  firmaInspectorBase64: string | null;
  selloInspectorBase64: string | null;
}

export const Nuevas = ({
  inspeccion,
  isometricoBase64,
  esquemaPlantaBase64,
  firmaBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  return (
    <>
      {/* Header */}
      <Header inspeccion={inspeccion} />

      {/* 1. Datos del usuario*/}
      <DatosUsuario inspeccion={inspeccion} />

      {/* 3. Informacion general */}
      <InformacionGeneral inspeccion={inspeccion} />

      {/* 3.3. Trazabilidad matriz */}
      <TrazabilidadMatriz inspeccion={inspeccion} />

      {/* 3.4. Trazabilidad matriz */}
      <TrazaVacioInterno inspeccion={inspeccion} />

      {/* 3.5 Centro de medicion */}
      <CentroMedicion inspeccion={inspeccion} />

      {/* 3.6 Instalador que contruyo */}
      <Instalador inspeccion={inspeccion} />

      {/* 3.7 Evaluacion documentacion */}
      <EvaluacionDocumentacion inspeccion={inspeccion} />

      {/* 4. Parametros disenio */}
      <ParametrosDisenio inspeccion={inspeccion} />

      {/* 5. Evaluacion recintos */}
      <EvaluacionRecintos inspeccion={inspeccion} />

      {/* 6. Isometricos */}
      <Isometricos
        inspeccion={inspeccion}
        isometricoBase64={isometricoBase64}
        esquemaPlantaBase64={esquemaPlantaBase64}
      />

      {/* 8. Ventilacion */}
      <Ventilacion inspeccion={inspeccion} />

      {/* 9. Parametros de evaluacion */}
      <ParametrosEvaluacion inspeccion={inspeccion} />

      <Defectologias inspeccion={inspeccion} />

      {/* 10. Equipo utilizados */}
      <EquiposUtilizados inspeccion={inspeccion} />

      {/* 11. Declaracion conformidad */}
      <DeclaracionConformidad inspeccion={inspeccion} />

      {/* 12. Footer */}
      <Footer
        inspeccion={inspeccion}
        firmaClienteBase64={firmaBase64}
        firmaInspectorBase64={firmaInspectorBase64}
        selloInspectorBase64={selloInspectorBase64}
      />
    </>
  );
};
