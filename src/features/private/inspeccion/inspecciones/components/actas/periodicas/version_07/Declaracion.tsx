import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black bg-white ml-[2px]">
    {checked ? (
      <span className="-mt-[2px] text-[10px] leading-none font-bold">✓</span>
    ) : null}
  </span>
);

export const Declaracion = ({ inspeccion }: Props) => {
  const conformidad: any = inspeccion?.declaracionConformidad?.[0] || {};

  const isSinDefectos = conformidad.defectos === null;
  const isNoCriticos = conformidad.defectos === false;
  const isCriticos = conformidad.defectos === true;

  const borderClass = "border-black";
  const textClass = "text-[7.5pt] font-arial leading-tight text-black";
  const sectionHeader =
    "bg-gray-200 font-bold text-center py-[2px] border-b border-black text-[7pt]";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div className={`${sectionHeader} `}>10. DECLARACIÓN DE CONFORMIDAD</div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} flex items-end justify-between`}
      >
        <div className="text-justify flex-1 mr-2 leading-tight">
          Se informo adquirir un mecanismo de advertencia, preferiblemente
          audiovisual, a un nivel de concentracion de CO en el ambiente igual o
          superior a 50 ppm:
        </div>
        <div className="flex items-center whitespace-nowrap">
          <span className="font-semibold mr-[2px]">SI</span>{" "}
          <Box checked={conformidad.declaracion1 === true} />
          <span className="font-semibold ml-2 mr-[2px]">NO</span>{" "}
          <Box checked={conformidad.declaracion1 === false} />
          <span className="font-semibold ml-2 mr-[2px]">NA</span>{" "}
          <Box
            checked={
              conformidad.declaracion1 === null ||
              conformidad.declaracion1 === undefined
            }
          />
        </div>
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} text-justify leading-tight`}
      >
        <span className="font-bold">Importante:</span> Si la Instalacion
        presenta Defectos No Criticos según Resoluciones 90902 Y 41385 se cuenta
        con dos meses para corregir dichos defectos, en todo caso este plazo no
        podra extenderse mas alla del plazo maximo de la revisión periodica con
        el fin de evitar la suspension del servicio por parte del Distribuidor.
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} text-justify leading-tight`}
      >
        <span className="font-bold">
          CONFIDENCIALIDAD: ELECTROGASES SAS. DECLARA:
        </span>
        Que la información contenida en este documento es de carácter
        confidencial, salvo los datos que sean requeridos para la solución de
        quejas y apelaciones ó con fines legales (requerimiento judicial,
        cumplimiento de reglamentación, legislación o normativa vigente, etc.);
        igualmente en su condición de responsable del tratamiento de los datos
        personales actuara conforme a la ley 1581 de 2012.
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} flex items-end justify-between`}
      >
        <span className="flex-1 mr-2">
          Se le informa al usuario que el resultado de la inspección sera
          reportado a la distribuidora en los tiempos establecidos según
          resolucion 90902 de 2013
        </span>
        <div className="flex items-center whitespace-nowrap">
          <span className="font-semibold mr-[2px]">SI</span>{" "}
          <Box checked={conformidad.declaracion2 === true} />
          <span className="font-semibold ml-2 mr-[2px]">NO</span>{" "}
          <Box checked={conformidad.declaracion2 === false} />
          <span className="font-semibold ml-2 mr-[2px]">NA</span>{" "}
          <Box
            checked={
              conformidad.declaracion2 === null ||
              conformidad.declaracion2 === undefined
            }
          />
        </div>
      </div>

      <div
        className={`px-1 py-[2px] border-b ${borderClass} flex items-center justify-between`}
      >
        <span>
          Si la instalación es conforme se adhiere en sitio visible la etiqueta
          que soporta esta inspección.
        </span>
        <div className="flex items-center">
          <span className="mr-[2px]">SI</span>{" "}
          <Box checked={conformidad.declaracion3 === true} />
          <span className="ml-2 mr-[2px]">NO</span>{" "}
          <Box checked={conformidad.declaracion3 === false} />
        </div>
      </div>

      <div className="flex w-full border-b border-black h-[28px]">
        <div className={`w-[40%] border-r ${borderClass} flex flex-col`}>
          <div className="text-center font-bold text-[7pt] leading-none pt-[1px]">
            Resultados de la visita de inspección
          </div>
          <div className="flex-1 flex items-center justify-around px-1 text-[7pt]">
            <div className="flex items-center">
              Sin defectos: <Box checked={isSinDefectos} />
            </div>
            <div className="flex items-center">
              Defectos no criticos: <Box checked={isNoCriticos} />
            </div>
            <div className="flex items-center">
              Defectos Criticos: <Box checked={isCriticos} />
            </div>
          </div>
        </div>

        <div
          className={`w-[30%] border-r ${borderClass} flex items-center justify-center font-bold text-[8pt]`}
        >
          <span className="mr-2">INSTALACIÓN CONFORME:</span>
          <span className="mr-[2px]">SI</span>{" "}
          <Box checked={conformidad.instalacionConforme} />
          <span className="ml-2 mr-[2px]">NO</span>{" "}
          <Box checked={!conformidad.instalacionConforme} />
        </div>

        <div
          className={`w-[30%] flex items-center justify-center font-bold text-[7.5pt]`}
        >
          <span className="mr-2">Predio Continua En Servicio :</span>
          <span className="mr-[2px]">Si</span>{" "}
          <Box checked={conformidad.continuaServicio} />
          <span className="ml-2 mr-[2px]">No</span>{" "}
          <Box checked={!conformidad.continuaServicio} />
        </div>
      </div>

      <div className="w-full flex flex-col h-[50px]">
        <div className="w-full px-1 py-[1px] leading-tight">
          <span className="font-bold">12. OBSERVACIONES:</span> (En este espacio
          solo deben quedar registradas observaciones producto de evaluación de
          la conformidad resoluciones 90902 de 2013 y 41385 de 2017)
        </div>
        <div className="flex-1 px-1 font-arial text-[7pt]">
          {conformidad.observaciones}
        </div>
      </div>
    </div>
  );
};
