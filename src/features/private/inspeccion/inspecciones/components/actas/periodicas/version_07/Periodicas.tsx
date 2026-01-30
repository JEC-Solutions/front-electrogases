import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import {
  Header,
  DatosUsuario,
  InformacionGeneral,
  TrazabilidadMatriz,
  TrazaVacioInterno,
  EvalRecintosTablaSimple,
  SeccionIsometricos,
  TablaVentilacion,
  ParametrosEvaluacion,
  Defectologias,
  Equipos,
  Registro,
  Declaracion,
} from "@/features/private/inspeccion/inspecciones/components";

interface Props {
  inspeccion: IActa;
  isometricoBase64: string | undefined;
  esquemaPlantaBase64: string | undefined;
  firmaBase64: string | undefined;
  firmaInspectorBase64: string | null;
  selloInspectorBase64: string | null;
}

export const Periodicas = ({
  inspeccion,
  isometricoBase64,
  esquemaPlantaBase64,
  firmaBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  return (
    <>
      {/* HEADER: ancho total 1246px con 5 secciones */}
      <Header inspeccion={inspeccion} />

      {/*  === 1. DATOS DEL USUARIO + 2 IDENTIFICACION DEL ORGANISMO DE INSPECCION */}
      <DatosUsuario inspeccion={inspeccion} />

      {/* === 3. INFORMACIÓN GENERAL + 3.1 CLASE DE USO === */}
      <InformacionGeneral inspeccion={inspeccion} />

      {/* 3.3 TRAZABILIDAD DE LA LÍNEA MATRIZ */}
      <TrazabilidadMatriz inspeccion={inspeccion} />

      {/* 3.4 TRAZABILIDAD DE VACÍO INTERNO */}
      <TrazaVacioInterno inspeccion={inspeccion} />

      {/* 4. EVALUACION DE RECINTOS */}
      <EvalRecintosTablaSimple inspeccion={inspeccion} />

      {/* 5. 6. 6.1 ISOMETRICOS */}
      <SeccionIsometricos
        inspeccion={inspeccion}
        isometricoBase64={isometricoBase64}
        esquemaPlantaBase64={esquemaPlantaBase64}
      />

      {/* 7. VENTILACION */}
      <TablaVentilacion inspeccion={inspeccion} />

      {/* 8. PARAMETROS DE EVALUACION */}
      <ParametrosEvaluacion inspeccion={inspeccion} />

      <Defectologias inspeccion={inspeccion} />

      {/* 9 EQUIPOS*/}
      <Equipos inspeccion={inspeccion} />

      {/* 10 DECLARACION*/}
      <Declaracion inspeccion={inspeccion} />

      {/* 11 - 12  REGISTRO */}
      <Registro
        inspeccion={inspeccion}
        firmaClienteBase64={firmaBase64}
        firmaInspectorBase64={firmaInspectorBase64}
        selloInspectorBase64={selloInspectorBase64}
      />
    </>
  );
};
