import { useActa } from "@/features/private/inspeccion/inspecciones/hooks";
import {
  Header,
  DatosUsuario,
  InformacionGeneral,
  TrazabilidadMatriz,
  TrazaVacioInterno,
  EvalRecintosTablaSimple,
  SeccionIsometricos,
} from "@/features/private/inspeccion/inspecciones/components";

export const Acta = () => {
  const { inspeccion } = useActa();

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
          <SeccionIsometricos />
        </div>
      </div>
    </div>
  );
};
