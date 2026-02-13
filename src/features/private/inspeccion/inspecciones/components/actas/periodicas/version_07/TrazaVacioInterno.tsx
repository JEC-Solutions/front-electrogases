import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

// Checkbox simple
const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white ml-[2px]">
    {checked ? (
      <span className="-mt-[2px] text-[8px] leading-none font-bold">✓</span>
    ) : null}
  </span>
);

export const TrazaVacioInterno = ({ inspeccion }: Props) => {
  // Datos
  const vacio = inspeccion?.vacioInterno;
  const existeVacio = inspeccion?.vacio_interno;
  const ventilacion = vacio?.ventilacion;
  const cubierto = vacio?.cubierto;
  const cumple = vacio?.cumple;
  const verif3 = vacio?.forma === 3;
  const verif5 = vacio?.forma === 5;

  const borderClass = "border-black";
  const textClass = "text-[7pt] font-arial leading-tight text-black";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div className="flex w-full h-[45px]">
        {/* TITULO */}
        <div
          className={`w-[17%] border-r ${borderClass} bg-gray-200 flex items-center justify-center p-1 text-center font-bold`}
        >
          3.4. TRAZABILIDAD DE VACIO INTERNO
        </div>

        {/* EXISTE VACIO */}
        <div className={`w-[8%] border-r ${borderClass} flex flex-col`}>
          <div
            className={`h-[50%] border-b ${borderClass} flex items-center justify-center text-center px-1 leading-none`}
          >
            Existe vacio interno
          </div>
          <div className="h-[50%] flex items-center justify-around bg-gray-50">
            <div className="flex items-center">
              SI <Box checked={existeVacio} />
            </div>
            <div className="flex items-center">
              NO <Box checked={existeVacio === false} />
            </div>
          </div>
        </div>

        {/* DOCUMENTO LEGAL */}
        <div
          className={`w-[21%] border-r ${borderClass} flex flex-col p-[2px]`}
        >
          <div className="text-center leading-none mb-1 text-[6pt]">
            Licencia de construcción o certificado de Tradición Escritura
            Publica
          </div>
          <div className="flex flex-col justify-end flex-1 gap-[2px]">
            <div className="flex items-end w-full">
              <span className="whitespace-nowrap mr-1">___ N°</span>
              <div className="border-b border-black flex-1 text-center h-[10px] text-[8pt] leading-none">
                {vacio?.id_documento_legal}
              </div>
            </div>
            <div className="flex items-center w-full justify-center gap-2">
              <span>Fecha</span>
              {vacio?.fecha ? <span>{vacio?.fecha}</span> : <span>-</span>}
            </div>
          </div>
        </div>

        {/* USO */}
        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col p-[2px]`}
        >
          <div className="text-center font-semibold mb-[2px]">Uso:</div>
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="flex justify-between items-center">
              <span>Ventilación</span> <Box checked={ventilacion} />
            </div>
            <div className="flex justify-between items-center">
              <span>Evacuacion</span> <Box checked={ventilacion === false} />
            </div>
          </div>
        </div>

        {/* --- CORRECCION 1: AREA EN PLANTA --- */}
        <div
          className={`w-[8%] border-r ${borderClass} flex flex-col items-center justify-center p-[2px]`}
        >
          <div className="text-center leading-none text-[6pt]">
            Area en planta
          </div>
          <div className="flex items-center justify-center gap-1 font-bold text-[8pt]">
            <span>{vacio?.area_planta}</span>
            <span className="text-[7pt]">m²</span>
          </div>
        </div>

        {/* --- CORRECCION 2: LADO MINIMO --- */}
        <div
          className={`w-[8%] border-r ${borderClass} flex flex-col items-center justify-center p-[2px]`}
        >
          <div className="text-center leading-none text-[6pt]">Lado minimo</div>
          <div className="flex items-center justify-center gap-1 font-bold text-[8pt]">
            <span>{vacio?.lado_minimo}</span>
            <span className="text-[7pt]">m</span>
          </div>
        </div>

        {/* PISOS */}
        <div className={`w-[6%] border-r ${borderClass} flex flex-col`}>
          <div className="text-center mt-1 mb-1"># de pisos:</div>
          <div className="flex-1 bg-gray-100 flex items-center justify-center font-bold m-[2px]">
            {vacio?.nro_pisos}
          </div>
        </div>

        {/* --- CORRECCION 3: AREA LIBRE CUBIERTA --- */}
        <div className={`w-[13%] border-r ${borderClass} flex flex-col`}>
          <div className="h-[50%] flex items-center justify-center gap-1">
            <span>Cubierto:</span>
            <span>SI</span> <Box checked={cubierto} />
            <span>NO</span> <Box checked={cubierto === false} />
          </div>
          {/* Ajuste de alineación y tamaño de fuente */}
          <div className="h-[50%] flex items-end px-[2px] pb-[2px] w-full">
            <span className="whitespace-nowrap mr-1 text-[6pt] mb-[1px]">
              Area libre cubierta
            </span>
            <div className="border-b border-black flex-1 text-center text-[8pt] leading-none mb-[1px]">
              {vacio?.area_cubierta}
            </div>
            <span className="ml-[1px] text-[7pt] mb-[1px]">m²</span>
          </div>
        </div>

        {/* CUMPLE */}
        <div className="flex-1 flex flex-col">
          <div className={`h-[50%] border-b ${borderClass} flex`}>
            <div
              className={`w-[50%] border-r ${borderClass} flex items-center justify-center font-bold text-[9pt]`}
            >
              CUMPLE
            </div>
            <div className="w-[50%] flex items-center justify-center text-center text-[6pt] leading-none px-[1px]">
              verificación de ventilación (años)
            </div>
          </div>

          <div className="h-[50%] flex">
            <div
              className={`w-[50%] border-r ${borderClass} flex items-center justify-around bg-gray-50`}
            >
              <div className="flex items-center gap-[1px]">
                SI <Box checked={cumple} />
              </div>
              <div className="flex items-center gap-[1px]">
                NO <Box checked={cumple === false} />
              </div>
            </div>
            <div className="w-[50%] flex items-center justify-around">
              <div className="flex items-center gap-[1px]">
                3 <Box checked={verif3} />
              </div>
              <div className="flex items-center gap-[1px]">
                5 <Box checked={verif5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
