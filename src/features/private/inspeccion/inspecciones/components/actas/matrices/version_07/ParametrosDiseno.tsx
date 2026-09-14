import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const ParametrosDiseno = ({ inspeccion }: Props) => {
  const parametros = inspeccion?.datos_matriz?.parametros_diseno || [];

  const pVal = (v: any) =>
    v !== null && v !== undefined && v !== "" ? String(v) : "";

  const formatOcultaVista = (item: any): string => {
    if (!item) return "";
    if (typeof item.oculta === "boolean") {
      return item.oculta ? "Oculta" : "A la Vista";
    }
    if (typeof item.oculta === "string" && item.oculta.trim() !== "") {
      return item.oculta;
    }
    if (item.aVista === true || item.a_la_vista === true) {
      return "A la Vista";
    }
    return "";
  };

  const rows = Array.from({ length: 10 }, (_, i) => {
    const leftIndex = i;
    const rightIndex = i + 10;
    const itemL = parametros[leftIndex];
    const itemR = parametros[rightIndex];

    return {
      index: i + 1,
      lTramo: pVal(itemL?.tramo || itemL?.tramos),
      lMat: pVal(itemL?.material),
      lDiam: pVal(itemL?.diametro),
      lLong: pVal(itemL?.longitud_m ?? itemL?.longitud),
      lOculVist: formatOcultaVista(itemL),
      rTramo: pVal(itemR?.tramo || itemR?.tramos),
      rMat: pVal(itemR?.material),
      rDiam: pVal(itemR?.diametro),
      rLong: pVal(itemR?.longitud_m ?? itemR?.longitud),
      rOculVist: formatOcultaVista(itemR),
    };
  });

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
        8. . PARAMETROS DEL TRAZADO Y/O DISEÑO
      </div>

      {/* Encabezado de Columnas (10 Columnas: 5 a la izquierda y 5 a la derecha) */}
      <div className="flex flex-row w-full border-b border-black bg-white text-[6.8pt] font-bold text-center box-border min-h-[16px]">
        {/* Bloque Izquierdo (50%) */}
        <div className="w-[5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Tramos
        </div>
        <div className="w-[14%] border-r border-black p-[2px_2px] flex items-center justify-center">
          Material
        </div>
        <div className="w-[6.5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Diametro
        </div>
        <div className="w-[6.5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Longitud
        </div>
        <div className="w-[18%] border-r border-black p-[2px_2px] flex items-center justify-center text-[5.8pt] whitespace-nowrap">
          Oculta/ A la Vista
        </div>

        {/* Bloque Derecho (50%) */}
        <div className="w-[5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Tramos
        </div>
        <div className="w-[14%] border-r border-black p-[2px_2px] flex items-center justify-center">
          Material
        </div>
        <div className="w-[6.5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Diametro
        </div>
        <div className="w-[6.5%] border-r border-black p-[2px_1px] flex items-center justify-center">
          Longitud
        </div>
        <div className="w-[18%] p-[2px_2px] flex items-center justify-center text-[5.8pt] whitespace-nowrap">
          Oculta/ A la Vista
        </div>
      </div>

      {/* Filas 1 a 10 */}
      {rows.map((r, idx) => {
        const isLast = idx === 9;
        return (
          <div
            key={r.index}
            className={`flex flex-row w-full ${!isLast ? "border-b border-black" : ""} min-h-[15px] text-[6.8pt] box-border`}
          >
            {/* Lado Izquierdo */}
            <div className="w-[5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.lTramo}
            </div>
            <div className="w-[14%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.lMat}
            </div>
            <div className="w-[6.5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.lDiam}
            </div>
            <div className="w-[6.5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.lLong}
            </div>
            <div className="w-[18%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.lOculVist}
            </div>

            {/* Lado Derecho */}
            <div className="w-[5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.rTramo}
            </div>
            <div className="w-[14%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.rMat}
            </div>
            <div className="w-[6.5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.rDiam}
            </div>
            <div className="w-[6.5%] border-r border-black p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.rLong}
            </div>
            <div className="w-[18%] p-[1px_2px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
              {r.rOculVist}
            </div>
          </div>
        );
      })}
    </div>
  );
};
