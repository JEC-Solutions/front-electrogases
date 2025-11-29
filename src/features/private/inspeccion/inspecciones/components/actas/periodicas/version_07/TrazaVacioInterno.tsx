import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black bg-white">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none font-bold">✓</span>
      ) : null}
    </span>
  );
}

export const TrazaVacioInterno = ({ inspeccion }: Props) => {
  const forma3 = inspeccion?.vacioInterno?.forma === 3;
  const forma5 = inspeccion?.vacioInterno?.forma === 5;

  return (
    <div className="w-full border-l border-r border-b border-black text-[8pt] font-arial text-black box-border">
      <div className="flex w-full h-[55px]">
        <div className="w-[16%] border-r border-black bg-gray-200 flex items-center justify-center p-2 text-center font-bold">
          3.4. TRAZABILIDAD DE VACIO INTERNO
        </div>
        <div className="w-[7%] border-r border-black flex flex-col">
          <div className="h-[28px] border-b border-black flex items-center justify-center text-center leading-none px-1">
            Existe vacio interno
          </div>
          <div className="flex-1 flex items-center justify-around px-1">
            <div className="flex items-center gap-1">
              <span>SI</span> <Box checked={inspeccion?.vacio_interno} />
            </div>
            <div className="flex items-center gap-1">
              <span>NO</span> <Box checked={!inspeccion?.vacio_interno} />
            </div>
          </div>
        </div>
        <div className="w-[20%] border-r border-black flex flex-col">
          <div className="h-[28px] border-b border-black flex items-center justify-center text-center leading-none px-1 text-[7pt]">
            Licencia de construcción o certificado de Tradición Escritura
            Publica
          </div>
          <div className="flex-1 flex flex-col justify-center px-1 text-[7pt]">
            <div className="flex items-center whitespace-nowrap mb-0.5">
              <span className="mr-1">___ N°</span>
              <span className="border-b border-black flex-1 h-[12px] px-1 truncate">
                {inspeccion?.vacioInterno?.id_documento_legal}
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <span className="mr-1">Fecha</span>
              <span className="mr-1">-</span>
              <span className="mr-1">-</span>
              <span>{inspeccion?.vacioInterno?.fecha}</span>
            </div>
          </div>
        </div>
        <div className="w-[9%] border-r border-black flex flex-col">
          <div className="h-[18px] text-center font-semibold pt-0.5">Uso:</div>
          <div className="flex-1 flex flex-col justify-center px-2">
            <div className="flex items-center justify-between mb-0.5">
              <span>Ventilación</span>{" "}
              <Box checked={inspeccion?.vacioInterno?.ventilacion} />
            </div>
            <div className="flex items-center justify-between">
              <span>Evacuacion</span>{" "}
              <Box checked={!inspeccion?.vacioInterno?.ventilacion} />
            </div>
          </div>
        </div>
        <div className="w-[8%] border-r border-black flex flex-col">
          <div className="h-[28px] text-center leading-none pt-1">
            Area en planta
          </div>
          <div className="flex-1 flex items-end justify-center pb-1">
            <span className="font-bold text-[10pt] mb-1">m²</span>
            <span className="absolute mb-4">
              {inspeccion?.vacioInterno?.area_planta}
            </span>
          </div>
        </div>
        <div className="w-[8%] border-r border-black flex flex-col">
          <div className="h-[28px] text-center leading-none pt-1">
            Lado minimo
          </div>
          <div className="flex-1 flex items-end justify-center pb-1">
            <span className="font-bold text-[10pt] mb-1">m</span>
            <span className="absolute mb-4">
              {inspeccion?.vacioInterno?.lado_minimo}
            </span>
          </div>
        </div>
        <div className="w-[6%] border-r border-black flex flex-col">
          <div className="h-[28px] text-center leading-none pt-1">
            # de pisos:
          </div>
          <div className="flex-1 flex items-center justify-center bg-gray-100 m-1">
            {inspeccion?.vacioInterno?.nro_pisos}
          </div>
        </div>
        <div className="w-[14%] border-r border-black flex flex-col">
          <div className="h-[28px] flex items-center justify-center px-1">
            <span className="mr-1">Cubierto:</span>
            <span className="mr-1 text-[7pt]">SI</span>{" "}
            <Box checked={inspeccion?.vacioInterno?.cubierto} />
            <span className="ml-1 mr-1 text-[7pt]">NO</span>{" "}
            <Box checked={!inspeccion?.vacioInterno?.cubierto} />
          </div>
          <div className="flex-1 flex items-end px-1 pb-1 whitespace-nowrap">
            <span className="mr-1 text-[7pt]">Area libre cubierta</span>
            <span className="border-b border-black flex-1 h-[12px]"></span>
            <span className="ml-1 text-[7pt]">m²</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-[28px] border-b border-black flex">
            <div className="w-[60%] border-r border-black flex flex-col items-center justify-center">
              <div className="font-bold text-[10pt] leading-none">CUMPLE</div>
            </div>
            <div className="flex-1 flex flex-col justify-center px-1 text-[6pt] leading-none text-center">
              verificación de ventilación (años)
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="w-[60%] border-r border-black flex items-center justify-around px-1">
              <div className="flex items-center gap-1">
                <span>SI</span>{" "}
                <Box checked={inspeccion?.vacioInterno?.cumple} />
              </div>
              <div className="flex items-center gap-1">
                <span>NO</span>{" "}
                <Box checked={!inspeccion?.vacioInterno?.cumple} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around px-1">
              <div className="flex items-center gap-0.5">
                <span>3</span> <Box checked={forma3} />
              </div>
              <div className="flex items-center gap-0.5">
                <span>5</span> <Box checked={forma5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
