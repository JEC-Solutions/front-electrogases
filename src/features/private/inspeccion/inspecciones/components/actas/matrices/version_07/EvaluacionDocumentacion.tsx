import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const DocBox = ({ checked }: { checked: boolean }) => (
  <div className="inline-flex items-center justify-center w-[16px] h-[11px] border-[0.75pt] border-[#777] bg-[#e5e7eb] align-middle leading-none box-border">
    {checked && (
      <span className="font-arial text-[9px] font-bold text-black leading-none">
        &#10003;
      </span>
    )}
  </div>
);

const SiNoNaGroup = ({ val }: { val: boolean | null | undefined }) => {
  const isSi = val === true;
  const isNo = val === false;
  const isNa = val === null;

  return (
    <div className="flex gap-[3px] w-[54px] justify-between">
      <DocBox checked={isSi} />
      <DocBox checked={isNo} />
      <DocBox checked={isNa} />
    </div>
  );
};

export const EvaluacionDocumentacion = ({ inspeccion }: Props) => {
  const documentacion =
    inspeccion?.datos_matriz?.linea_nueva?.documentacion ||
    (inspeccion?.datos_matriz?.linea_nueva as any)?.evaluacion_documentacion ||
    inspeccion?.datos_matriz?.evaluacion_documentacion;

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] leading-[1.2]">
        4.2 EVALUACIÓN DOCUMENTAL Y REQUISITOS NORMATIVOS APLICABLES (matrices nuevas)
      </div>

      {/* Fila de Sub-encabezados Cumple SI NO NA */}
      <div className="flex flex-row w-full border-b border-black box-border text-[6.8pt] bg-white min-h-[16px]">
        {/* Subheader Col 1 (26%) */}
        <div className="w-[26%] border-r border-black p-[1.5px_5px] flex items-center justify-end box-border">
          <span className="font-bold mr-[6px]">Cumple</span>
          <div className="flex gap-[3px] w-[54px] justify-between text-center">
            <span className="w-[16px] font-bold">SI</span>
            <span className="w-[16px] font-bold">NO</span>
            <span className="w-[16px] font-bold">NA</span>
          </div>
        </div>

        {/* Subheader Col 2 (27%) */}
        <div className="w-[27%] border-r border-black p-[1.5px_5px] flex items-center justify-end box-border">
          <span className="font-bold mr-[6px]">Cumple</span>
          <div className="flex gap-[3px] w-[54px] justify-between text-center">
            <span className="w-[16px] font-bold">SI</span>
            <span className="w-[16px] font-bold">NO</span>
            <span className="w-[16px] font-bold">NA</span>
          </div>
        </div>

        {/* Subheader Col 3 (47%) */}
        <div className="w-[47%] p-[1.5px_5px] flex items-center justify-end box-border">
          <span className="font-bold mr-[6px]">Cumple</span>
          <div className="flex gap-[3px] w-[54px] justify-between text-center">
            <span className="w-[16px] font-bold">SI</span>
            <span className="w-[16px] font-bold">NO</span>
            <span className="w-[16px] font-bold">NA</span>
          </div>
        </div>
      </div>

      {/* Bloque de 3 Columnas (Filas 1 y 2) */}
      <div className="flex flex-row w-full border-b border-black box-border">
        {/* Columna 1 (26%): NTC 3838 5 ta Acta (MPOP) - Abarca ambas filas */}
        <div className="w-[26%] border-r border-black p-[4px_5px] flex items-center justify-between box-border text-[6.8pt]">
          <div className="flex flex-col leading-[1.15] font-bold">
            <span>NTC 3838 5 ta Acta</span>
            <span>(MPOP)</span>
          </div>
          <SiNoNaGroup val={documentacion?.ntc3838_5ta_actualizacion} />
        </div>

        {/* Columna 2 (27%): Memoria de Calculo y Registro SIC del instalador */}
        <div className="w-[27%] border-r border-black flex flex-col box-border text-[6.8pt]">
          <div className="flex items-center justify-between px-[5px] py-[2.5px] border-b border-black min-h-[17px] box-border">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Memoria de Calculo:</span>
            <SiNoNaGroup val={documentacion?.memoria_calculo} />
          </div>
          <div className="flex items-center justify-between px-[5px] py-[2.5px] min-h-[17px] box-border">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Registro SIC del instalador:</span>
            <SiNoNaGroup val={documentacion?.registro_sic_instalador} />
          </div>
        </div>

        {/* Columna 3 (47%): Diseño o isométrico y Certificado de materiales */}
        <div className="w-[47%] flex flex-col box-border text-[6.8pt]">
          <div className="flex items-center justify-between px-[5px] py-[2.5px] border-b border-black min-h-[17px] box-border">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Diseño o isometrico de la instalación:</span>
            <SiNoNaGroup val={documentacion?.diseno_isometrico} />
          </div>
          <div className="flex items-center justify-between px-[5px] py-[2.5px] min-h-[17px] box-border">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Certificado o Declaración de conformidad de los materiales:</span>
            <SiNoNaGroup val={documentacion?.certificado_conformidad_materiales} />
          </div>
        </div>
      </div>

      {/* Fila 3 (Inferior): NTC 2505 4 ta Actal: Diseño y Construcción */}
      <div className="flex flex-row w-full min-h-[17px] box-border text-[6.8pt]">
        {/* Columna 1 (26%): NTC 2505 4 ta Actal: */}
        <div className="w-[26%] border-r border-black p-[2px_5px] flex items-center box-border font-bold">
          <span>NTC 2505 4 ta Actal</span>
        </div>

        {/* Columna 2 (27%): Diseño: */}
        <div className="w-[27%] border-r border-black p-[2px_5px] flex items-center justify-between box-border">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">Diseño:</span>
          <SiNoNaGroup val={documentacion?.ntc2505_4ta_actualizacion_diseno} />
        </div>

        {/* Columna 3 (47%): Construcción */}
        <div className="w-[47%] p-[2px_5px] flex items-center justify-between box-border">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">Construcción</span>
          <SiNoNaGroup val={documentacion?.ntc2505_4ta_actualizacion_construccion} />
        </div>
      </div>
    </div>
  );
};
