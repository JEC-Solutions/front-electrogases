import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none">✓</span>
      ) : null}
    </span>
  );
}

export const TrazaVacioInterno = ({ inspeccion }: Props) => {
  const forma3 = inspeccion?.vacioInterno?.forma === 3;
  const forma5 = inspeccion?.vacioInterno?.forma === 5;

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="w-max">
        <div className="grid grid-cols-[260px_130px_1fr_150px_110px_100px_90px_240px_170px] border-b border-l border-black text-xs leading-tight box-border">
          {/* Col 1: Título */}
          <div className="px-2 py-1 border-r border-black bg-gray-100 font-bold flex items-center">
            3.4 TRAZABILIDAD DE VACÍO INTERNO
          </div>

          {/* Col 2: Existe vacío interno (SI/NO) */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Existe vacío interno
            </div>
            <div className="px-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="font-semibold">SI</span>
                <Box checked={inspeccion?.vacio_interno} />
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">NO</span>
                <Box checked={!inspeccion?.vacio_interno} />
              </span>
            </div>
          </div>

          {/* Col 3: Licencia / Certificado / Tradición / Escritura / N° / Fecha */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[8px] font-semibold flex items-center">
              Licencia de construcción o certificado de Tradición / Escritura
              Pública
            </div>
            <div className="px-2 py-1 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold">N°</span>
                <span className="flex-1 h-[18px] border-b border-black">
                  {inspeccion?.vacioInterno?.id_documento_legal}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Fecha</span>
                <span>{inspeccion?.vacioInterno?.fecha}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Uso (Ventilación / Evacuación) */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Uso:
            </div>
            <div className="px-2 py-1 flex flex-col gap-1">
              <span className="flex items-center justify-between">
                <span className="font-semibold">Ventilación</span>
                <Box checked={inspeccion?.vacioInterno?.ventilacion} />
              </span>
              <span className="flex items-center justify-between">
                <span className="font-semibold">Evacuación</span>
                <Box checked={!inspeccion?.vacioInterno?.ventilacion} />
              </span>
            </div>
          </div>

          {/* Col 5: Área en planta (m²) */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Área en planta
            </div>
            <div className="px-2 flex items-center gap-1">
              <span className="flex-1 h-[18px] border-b border-black">
                {inspeccion?.vacioInterno?.area_planta}
              </span>
              <span className="font-semibold">m²</span>
            </div>
          </div>

          {/* Col 6: Lado mínimo (m) */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Lado mínimo
            </div>
            <div className="px-2 flex items-center gap-1">
              <span className="flex-1 h-[18px] border-b border-black">
                {inspeccion?.vacioInterno?.lado_minimo}
              </span>
              <span className="font-semibold">m</span>
            </div>
          </div>

          {/* Col 7: # de pisos */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              # de pisos
            </div>
            <div className="px-2 flex items-center">
              <span className="flex-1 h-[18px] border-b border-black">
                {inspeccion?.vacioInterno?.nro_pisos}
              </span>
            </div>
          </div>

          {/* Col 8: Cubierto / Área libre cubierta */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Cubierto:
              <span className="ml-2 mr-1 font-semibold">SI</span>
              <Box checked={inspeccion?.vacioInterno?.cubierto} />
              <span className="ml-2 mr-1 font-semibold">NO</span>
              <Box checked={!inspeccion?.vacioInterno?.cubierto} />
            </div>
            <div className="px-2 py-1 flex items-center gap-1">
              <span className="font-semibold">Área libre cubierta</span>
              <span className="flex-1 h-[18px] border-b border-black">
                {inspeccion?.vacioInterno?.area_cubierta}
              </span>
              <span className="font-semibold">m²</span>
            </div>
          </div>

          {/* Col 9: CUMPLE + Verificación de ventilación (años) */}
          <div className="grid grid-rows-[28px_1fr]">
            <div className="px-2 bg-gray-100 font-bold text-center border-b border-r border-black">
              CUMPLE
            </div>
            <div className="grid grid-cols-2 ">
              {/* Columna izquierda: SI/NO */}
              <div className="border-r border-black flex flex-col">
                <div className="px-2 h-[26px] flex items-center justify-between border-b border-black">
                  <span className="font-semibold">SI</span>
                  <Box checked={inspeccion?.vacioInterno?.cumple} />
                </div>
                <div className="px-2 h-[26px] flex items-center justify-between  border-black">
                  <span className="font-semibold">NO</span>
                  <Box checked={!inspeccion?.vacioInterno?.cumple} />
                </div>
              </div>
              {/* Columna derecha: verificación de ventilación (años) */}
              <div className="px-2 flex flex-col justify-center border-r">
                <div className="text-[10px] font-semibold leading-none mb-1">
                  verificación de ventilación (años)
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">3</span>
                    <Box checked={forma3} />
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">5</span>
                    <Box checked={forma5} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
