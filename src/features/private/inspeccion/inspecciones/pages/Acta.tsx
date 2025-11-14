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

export const Acta = () => {
  const { inspeccion, isometricoBase64, esquemaPlantaBase64, firmaBase64 } =
    useActa();

  return (
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
        shadow
        print:w-[380mm]      
        print:min-h-[297mm]
        print:shadow-none
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

      {/* EVALUACION DE RECINTOS */}
      <div className="overflow-y-hidden">
        <div className="w-max">
          <div className="px-2 py-1 border-l border-r border-black bg-gray-100 font-bold text-center">
            4. EVALUACION DE LOS RECINTOS Y TIPOS DE ARTEFACTOS
          </div>
          <EvalRecintosTablaSimple inspeccion={inspeccion} />
        </div>
      </div>

      {/* ISOMETRICOS */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <SeccionIsometricos
            inspeccion={inspeccion}
            isometricoBase64={isometricoBase64}
            esquemaPlantaBase64={esquemaPlantaBase64}
          />
        </div>
      </div>

      {/* 7. VENTILACION */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <TablaVentilacion inspeccion={inspeccion} />
        </div>
      </div>

      {/* 8. PARAMETROS DE EVALUACION */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="w-max">
          <div className="border-t border-black">
            <div className="border-l border-r border-black bg-gray-100 font-bold text-center text-xs py-1">
              8. PARÁMETROS DE EVALUACIÓN / RESOLUCIÓN 90902 DE 2013 /
              RESOLUCIÓN 41385 DE 2017
            </div>

            <ParametrosEvaluacion inspeccion={inspeccion} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <div className="w-max">
          <Defectologias inspeccion={inspeccion} />
        </div>
      </div>

      {/* 9 EQUIPOS*/}
      <div className="overflow-x-auto overflow-y-hidden">
        <Equipos />
      </div>

      {/* 10 DECLARACION*/}
      <div className="overflow-x-auto overflow-y-hidden">
        <Declaracion />
      </div>

      {/* 11 - 12  REGISTRO*/}
      <div className="overflow-x-auto overflow-y-hidden">
        <Registro inspeccion={inspeccion} firmaBase64={firmaBase64} />
      </div>
    </div>
  );
};
