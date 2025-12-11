import { useActa } from "@/features/private/inspeccion/inspecciones/hooks";
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

import { useNavigate } from "react-router-dom";

export const Acta = () => {
  const navigate = useNavigate();
  const { inspeccion, isometricoBase64, esquemaPlantaBase64, firmaBase64 } =
    useActa();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 print:hidden z-50 font-bold"
      >
        Volver
      </button>
      <div
        className="
        w-full 
        max-w-[1246px]         
        min-h-[297mm]
        bg-white
        text-[10pt]
        leading-[1.35]
        text-black
        relative
        mx-auto
        shadow-lg              
        print:w-full           
        print:max-w-none       
        print:min-h-0
        print:shadow-none
        print:m-0
        box-border
      "
      >
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
        <Registro inspeccion={inspeccion} firmaBase64={firmaBase64} />
      </div>
    </>
  );
};
