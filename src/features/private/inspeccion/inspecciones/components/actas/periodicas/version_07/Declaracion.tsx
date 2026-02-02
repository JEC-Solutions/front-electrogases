import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[14px] h-[9px] border border-black bg-[#eee] ml-[3px] mb-[1px]">
    {checked ? (
      <span className="text-[8px] leading-none font-bold text-black -mt-[1px]">
        ✓
      </span>
    ) : null}
  </span>
);

export const Declaracion = ({ inspeccion }: Props) => {
  const conformidad: any = inspeccion?.declaracionConformidad?.[0] || {};

  const isSinDefectos = conformidad.defectos === null;
  const isNoCriticos = conformidad.defectos === false;
  const isCriticos = conformidad.defectos === true;

  const borderClass = "border-black";
  const textClass = "text-[6pt] font-arial leading-[1.1] text-black";
  const sectionHeader =
    "bg-[#f3f4f6] font-bold text-center py-[2px] border-b border-black text-[7pt] uppercase";

  return (
    <div
      className={`w-full border border-black flex flex-col ${textClass} box-border mt-[-1px]`}
    >
      <div className={sectionHeader}>10. DECLARACIÓN DE CONFORMIDAD</div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} flex items-end justify-between`}
      >
        <div className="text-justify flex-1 mr-2 leading-tight">
          Se informo adquirir un mecanismo de advertencia, preferiblemente
          audiovisual, a un nivel de concentración de CO en el ambiente igual o
          superior a 50 ppm:
        </div>
        <div className="flex items-center font-bold whitespace-nowrap">
          <span className="mr-[1px]">SI</span>{" "}
          <Box checked={conformidad.declaracion1 === true} />
          <span className="ml-2 mr-[1px]">NO</span>{" "}
          <Box checked={conformidad.declaracion1 === false} />
        </div>
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} text-justify leading-tight`}
      >
        <span className="font-bold">Importante:</span> Si la Instalación
        presenta Defectos No Críticos según Resoluciones 90902 Y 41385 se cuenta
        con dos meses para corregir dichos defectos, en todo caso este plazo no
        podrá extenderse más allá del plazo máximo de la revisión periódica con
        el fin de evitar la suspensión del servicio por parte del Distribuidor.
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} text-justify leading-tight`}
      >
        <span className="font-bold">
          CONFIDENCIALIDAD: ELECTROGASES SAS. DECLARA:
        </span>{" "}
        Que la información contenida en este documento es de carácter
        confidencial, salvo los datos que sean requeridos para la solución de
        quejas y apelaciones ó con fines legales (requerimiento judicial,
        cumplimiento de reglamentación, legislación o normativa vigente, etc.);
        igualmente en su condición de responsable del tratamiento de los datos
        personales actuará conforme a la ley 1581 de 2012.
      </div>

      <div className={`px-1 py-[2px] border-b ${borderClass} flex items-end`}>
        <div className="w-full text-justify leading-tight">
          Se le informa al usuario que el resultado de la inspección será
          reportado a la distribuidora en los tiempos establecidos según
          resolución 90902 de 2013{" "}
          <span className="font-bold whitespace-nowrap ml-2">
            N° DE REPORTE POR DEFECTO CRITICO _____________________________
          </span>
        </div>
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} flex items-center justify-between`}
      >
        <div>
          Si la instalación es conforme se adhiere en sitio visible la etiqueta
          que soporta esta inspección.
        </div>
        <div className="flex items-center font-bold whitespace-nowrap">
          <span className="mr-[1px]">SI</span>{" "}
          <Box checked={conformidad.declaracion3 === true} />
          <span className="ml-2 mr-[1px]">NO</span>{" "}
          <Box checked={conformidad.declaracion3 === false} />
        </div>
      </div>

      <div className="flex w-full border-b border-black items-stretch min-h-[25px]">
        <div className={`w-[40%] border-r ${borderClass} flex flex-col`}>
          <div className="text-center font-bold border-b border-black bg-white pt-[1px] leading-none">
            Resultados de la visita de inspección
          </div>
          <div className="flex-1 flex flex-row items-center justify-between px-1 py-[1px]">
            <div className="flex items-center whitespace-nowrap mr-1">
              Sin defectos: <Box checked={isSinDefectos} />
            </div>
            <div className="flex items-center whitespace-nowrap mr-1">
              Defectos no críticos: <Box checked={isNoCriticos} />
            </div>
            <div className="flex items-center whitespace-nowrap">
              Defectos Criticos: <Box checked={isCriticos} />
            </div>
          </div>
        </div>

        <div
          className={`w-[30%] border-r ${borderClass} flex items-center justify-center px-1`}
        >
          <span className="font-bold text-[7pt] mr-1 uppercase">
            INSTALACIÓN CONFORME:
          </span>
          <div className="flex items-center font-bold">
            <span className="mr-[1px]">SI</span>{" "}
            <Box checked={conformidad.instalacionConforme} />
            <span className="ml-2 mr-[1px]">NO</span>{" "}
            <Box checked={!conformidad.instalacionConforme} />
          </div>
        </div>

        {/* Columna 3 */}
        <div className={`w-[30%] flex items-center justify-center px-1`}>
          <span className="font-bold mr-1">Predio Continua En Servicio :</span>
          <div className="flex items-center font-bold">
            <span className="mr-[1px]">Si</span>{" "}
            <Box checked={conformidad.continuaServicio} />
            <span className="ml-2 mr-[1px]">No</span>{" "}
            <Box checked={!conformidad.continuaServicio} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col min-h-[40px] px-1 py-[2px]">
        <div className="leading-tight mb-1">
          <span className="font-bold">11. OBSERVACIONES:</span> (En este espacio
          solo deben quedar registradas observaciones producto de evaluación de
          la conformidad resoluciones 90902 de 2013 y 41385 de 2017)
        </div>
        <div className="flex-1 font-arial text-[6.5pt] whitespace-pre-wrap leading-tight">
          {conformidad.observaciones}
        </div>
      </div>
    </div>
  );
};
