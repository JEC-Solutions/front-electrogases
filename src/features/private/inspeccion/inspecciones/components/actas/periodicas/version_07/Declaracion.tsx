import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black bg-white">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none font-bold">x</span>
      ) : null}
    </span>
  );
}

export const Declaracion = ({ inspeccion }: Props) => {
  const conformidad: any = inspeccion?.declaracionConformidad?.[0] || {};

  const numReporte: any = inspeccion?.numero_reporte_critico || "";

  const defectosVal: any = conformidad?.defectos;

  return (
    <div className="w-full font-arial text-black">
      <div className="w-full border border-black text-[7.5pt] leading-snug">
        <div className="bg-gray-200 font-bold text-center py-1 border-b border-black">
          10. DECLARACIÓN DE CONFORMIDAD
        </div>

        {/* 1) Mecanismo de advertencia */}
        <div className="px-2 py-1 border-b border-black flex items-center justify-between">
          <p className="flex-1 pr-2 text-justify">
            Se informo adquirir un mecanismo de advertencia, preferiblemente
            audiovisual, a un nivel de concentracion de CO en el ambiente igual
            o superior a 50 ppm:
          </p>
          <span className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-semibold">SI</span>{" "}
            <Box checked={conformidad.declaracion1} />
            <span className="font-semibold ml-1">NO</span>{" "}
            <Box checked={!conformidad.declaracion1} />
          </span>
        </div>

        {/* 2) Importante */}
        <div className="px-2 py-1 border-b border-black text-justify">
          <span className="font-bold">Importante:</span> Si la Instalacion
          presenta Defectos No Criticos según Resoluciones 90902 Y 41385 se
          cuenta con dos meses para corregir dichos defectos, en todo caso este
          plazo no podra extenderse mas alla del plazo maximo de la revisión
          periodica con el fin de evitar la suspension del servicio por parte
          del Distribuidor.
        </div>

        {/* 3) Confidencialidad */}
        <div className="px-2 py-1 border-b border-black text-justify">
          <span className="font-bold">
            CONFIDENCIALIDAD: ELECTROGASES SAS. DECLARA:
          </span>{" "}
          Que la información contenida en este documento es de carácter
          confidencial, salvo los datos que sean requeridos para la solución de
          quejas y apelaciones ó con fines legales (requerimiento judicial,
          cumplimiento de reglamentación, legislación o normativa vigente,
          etc.); igualmente en su condición de responsable del tratamiento de
          los datos personales actuara conforme a la ley 1581 de 2012.
        </div>

        {/* 4) Reporte a distribuidora */}
        <div className="px-2 py-1 border-b border-black flex flex-wrap items-end justify-between">
          <span>
            Se le informa al usuario que el resultado de la inspección sera
            resportado a la distribuidora en los tiempos establecidos según
            resolucion 90902 de 2013
          </span>
          <div className="flex items-end flex-1 ml-2 min-w-[250px]">
            <span className="font-bold whitespace-nowrap mr-1">
              N° DE REPORTE POR DEFECTO CRITICO
            </span>
            <span className="border-b border-black flex-1 h-[12px]">
              {numReporte}
            </span>
          </div>
        </div>

        {/* 5) Etiqueta visible */}
        <div className="px-2 py-1 flex items-center justify-between">
          <span className="flex-1">
            Si la instalación es conforme se adhiere en sitio visible la
            etiqueta que soporta esta inspección.
          </span>
          <span className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-semibold">SI</span>{" "}
            <Box checked={conformidad.declaracion1} />
            <span className="font-semibold ml-1">NO</span>{" "}
            <Box checked={!conformidad.declaracion1} />
          </span>
        </div>
      </div>

      {/* --- BLOQUE DE RESULTADOS (3 Columnas) --- */}
      <div className="w-full border-l border-r border-b border-black flex text-[7.5pt]">
        {/* COL 1: Resultados */}
        <div className="w-[40%] flex flex-col border-r border-black">
          <div className="flex-1 flex items-center justify-center font-bold border-b border-black bg-gray-50 py-1">
            Resultados de la visita de inspección
          </div>
          <div className="h-[24px] flex items-center justify-around px-1">
            <div className="flex items-center gap-1">
              <span>Sin defectos:</span>
              <Box checked={defectosVal === null} />
            </div>
            <div className="flex items-center gap-1">
              <span>Defectos no criticos:</span>
              <Box checked={defectosVal === true} />
            </div>
            <div className="flex items-center gap-1">
              <span>Defectos Criticos:</span>
              <Box checked={defectosVal === false} />
            </div>
          </div>
        </div>

        {/* COL 2: Instalación Conforme */}
        <div className="w-[30%] border-r border-black flex items-center justify-between px-2">
          <span className="font-bold text-[9pt]">INSTALACIÓN CONFORME:</span>
          <div className="flex items-center gap-1 font-bold text-[9pt]">
            <span>SI</span> <Box checked={conformidad.instalacionConforme} />
            <span className="ml-2">NO</span>{" "}
            <Box checked={!conformidad.instalacionConforme} />
          </div>
        </div>

        {/* COL 3: Predio Continua */}
        <div className="w-[30%] flex items-center justify-between px-2">
          <span className="font-bold">Predio Continua En Servicio :</span>
          <div className="flex items-center gap-1 font-bold">
            <span>Si</span> <Box checked={conformidad.continuaServicio} />
            <span className="ml-2">No</span>{" "}
            <Box checked={!conformidad.continuaServicio} />
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 12: OBSERVACIONES --- */}
      <div className="w-full border-l border-r border-b border-black text-[7.5pt]">
        <div className="w-full border-b border-black px-2 py-1">
          <span className="font-bold">12. OBSERVACIONES: </span>
          <span>
            (En este espacio solo deben quedar registradas observaciones
            producto de evaluación de la conformidad resoluciones 90902 de 2013
            y 41385 de 2017)
          </span>
        </div>
        {/* Espacio en blanco para escribir */}
        <div className="h-[60px] w-full">{conformidad.observaciones}</div>
      </div>
    </div>
  );
};
