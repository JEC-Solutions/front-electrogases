import { useActa } from "@/features/private/inspeccion/inspecciones/hooks";
import {
  Header,
  DatosUsuario,
  InformacionGeneral,
  TrazabilidadMatriz,
  TrazaVacioInterno,
} from "@/features/private/inspeccion/inspecciones/components";

export const Acta = () => {
  const { inspeccion } = useActa();

  return (
    <div className="w-[380mm] min-h-[297mm] bg-white text-[10pt] leading-[1.35] text-black relative mx-auto shadow print:shadow-none print:w-auto print:min-h-0">
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
    </div>
  );
};
